import express from 'express';
import Analysis from '../models/Analysis';
import statusHandler from 'express-mongoose-status';
import { twitterServices } from '../twitter-services';

class AnalysisController {

  static getAll(req, res, next) {
    Analysis.find({_creator: req.user._id}, (err, analysis) => {
      if (err) next(err);

      res.send(analysis);
    });
  }

  static getSingle(req, res, next) {
    console.log(req.params._id);
    Analysis.findOne({_id: req.params._id}, (err, analysis) => {
      if (err) next(err);
      res.send(analysis);
    });
  }

  static createAnalysis(req, res, next) {
    const analysis = new Analysis(req.body.analysis);
    analysis._creator = req.user._id;
    analysis.save(err => {
      if (err) next(err);
      req.analysis = analysis;
      next();
    });
  }

  static deleteAnalysis(req, res, next) {
    Analysis.findOneAndRemove({_id: req.params._id}, (err, analysis) => {
      if (err) next(err);

      res.send(analysis);
    });
  }

  static editAnalysis(req, res, next) {
    res.send({});
  }

}

export default AnalysisController;
