import Analysis from '../models/Analysis';

class UserController {

  static getAllAnalysis(req, res, next) {
    Analysis.find({_creator: req.user._id}, (err, analysis) => {
      if (err) next(err);

      res.send(analysis);
    });
  }

}

export default UserController;
