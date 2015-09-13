import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from 'config';

import passport from 'passport';
import passportSocial from 'passport-twitter';
import expressSession from 'express-session';
import User from './models/User';

import AuthController from './controllers/AuthController';
import ApiController from './controllers/ApiController';
import AnalysisController from './controllers/AnalysisController';
import Analysis from './models/Analysis';

import bodyParser from 'body-parser';

import { twitterStream } from './TwitterSDK';
import _ from 'lodash';
import test from './test';

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
  app.use('/api/v1/analysis', new AnalysisController(twitterStream));

  app.use(express.static('public'));
  app.get(/.*/, (req, res) => {
    res.sendfile('./public/index.html');
  });

  // creates the http server
  const httpServer = worker.httpServer;
  httpServer.on('request', app);

  // creates the socket server
  const scServer = worker.scServer;

}