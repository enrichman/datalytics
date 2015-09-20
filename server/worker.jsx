import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from 'config';

import passport from 'passport';
import passportSocial from 'passport-twitter';
import expressSession from 'express-session';
import User from './models/User';

import ApiController from './controllers/ApiController';
import AnalysisController from './controllers/AnalysisController';
import UserController from './controllers/UserController';
import TimeSeriesController from './controllers/TimeSeriesController';
import TimeSeriesSentimentController from './controllers/TimeSeriesSentimentController';

import bodyParser from 'body-parser';

import { twitterServices, twitterMiner } from './twitter-services';


export const run = worker => {
  const app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.set('view engine', 'jade');

  mongoose.connect(config.databases.mongodb.uri, err => {
    if (err) console.log(err);
  });

  passport.use(new passportSocial.Strategy(config.twitter,
    (token, tokenSecret, profile, cb) => {
      const user = profile._json;
      user.idTwitter = user.id;
      user.token = token;
      user.tokenSecret = tokenSecret;
      User.update({idTwitter: user.idTwitter}, user, {upsert: true}, (err) => {
        cb(err, user);
      });
    }));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    User.findOne({idTwitter: obj.id}, (err, user) => {
      cb(err, user);
    });
  });

  app.use(expressSession({secret: config.server.session, resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api/v1', new ApiController);
  app.get('/api/v1/user/:_id/analysis', UserController.getAllAnalysis);
  app.get('/api/v1/analysis/:_id', AnalysisController.getSingle);

  app.post('/api/v1/analysis', AnalysisController.createAnalysis,
    (req, res, next) => {
      twitterServices.pushAnalysis(req.analysis);
      res.send(req.analysis);
    });

  app.delete('/api/v1/analysis', AnalysisController.deleteAnalysis);
  app.put('/api/v1/analysis', AnalysisController.editAnalysis);

  app.get('/api/v1/timeseries', TimeSeriesController.getTimeSeries);
  app.get('/api/v1/sentiment', TimeSeriesSentimentController.getTimeSeries);


  app.use(express.static('public'));
  app.get(/.*/, (req, res) => {
    res.sendfile('./public/index.html');
  });

  app.use((err, req, res, next) => {
    if (req.xhr) {
      res.status(500).send({ error: 'Something blew up!' });
    } else {
      next(err);
    }
  });

  // creates the http server
  const httpServer = worker.httpServer;
  httpServer.on('request', app);

  // creates the socket server
  const scServer = worker.scServer;

  twitterMiner.start();

  twitterServices.getTwitterStream().then(twitterStream => {
    twitterStream.on(/analysis\/.*/, (tweet, channel) => {
      const id = channel.match(/\/(.*?)$/)[1];
      scServer.global.publish(id, tweet);
      scServer.global.publish(id + ':ping', {comment: 1, reached: tweet.user.followers_count});
    });
    twitterStream.on(/keyword\/.*/, (tweet, channel) => {
      const keyword = channel.match(/\/(.*?)$/)[1];
      scServer.global.publish(keyword, tweet);
      scServer.global.publish(keyword + ':ping', {comment: 1, reached: tweet.user.followers_count});
    });
  });
}