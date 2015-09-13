import express from 'express';
import passport from 'passport';

class ApiController {

  constructor() {
    const router = express.Router();
    router.get('/login', passport.authenticate('twitter'));
    router.get('/logout', this.logout);
    router.get('/status', this.status);
    router.get('/callback', passport.authenticate('twitter'), this.callback);
    router.all('/*', this.checkIsLogged);
    return router;
  }

  status(req, res) {
    if (req.user) {
      res.send({logged: true, user: req.user});
    } else {
      res.send({logged: false, user: null});
    }
  }

  logout(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  }

  checkIsLogged(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).send({message: 'You\'re not authorized.'});
    }
  }

  callback(req, res) {
    res.redirect('/');
  }

}

export default ApiController;
