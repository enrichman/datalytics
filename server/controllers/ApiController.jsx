import express from 'express';

class ApiController {

  constructor() {
    const router = express.Router();
    router.all('/*', this.checkIsLogged);
    return router;
  }

  checkIsLogged(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).send();
    }
  }

}

export default ApiController;
