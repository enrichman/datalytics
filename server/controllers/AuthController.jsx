import express from 'express';
import passport from 'passport';

class AuthController {

  constructor() {
    const router = express.Router();
    router.get('/auth/twitter', passport.authenticate('twitter'));
    router.get('/auth/twitter/callback', passport.authenticate('twitter'), this.callback);
    router.get('/auth/logout', this.logout);
    router.all('/api/v1/*', this.checkIsLogged);
    return router;
  }

  callback(req, res) {
    res.redirect('/');
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
      res.status(401).send();
    }
  }

}

export default AuthController;
