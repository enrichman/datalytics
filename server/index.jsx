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

const app = express();

app.use(morgan('dev'));

mongoose.connect(config.databases.mongodb.uri, err => {
  if (err) process.exit(1);
});

app.use(express.static('public'));

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
  cb(null, obj);
});

app.use(expressSession({ secret: config.server.session, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', new AuthController);
app.use('/api/v1', new ApiController);
app.use('/api/v1/analysis', new AnalysisController);

app.listen(app.get('env') === 'development' ? config.server.port : 8000);
