import express from 'express';
import User from '../models/User';
import Analysis from '../models/Analysis';
import statusHandler from 'express-mongoose-status';

class AnalysisController {

  constructor() {
    const router = express.Router();
    router.get('/', this.getAll);
    router.get('/:_id', this.getSingle);
    router.post('/', this.createAnalysis);
    router.delete('/:_id', this.deleteAnalysis);
    router.put('/:_id', this.editAnalysis);
    return router;
  }

  getAll(req, res) {
    Analysis.find({_creator: req.user._id}, (err, analysis) => {
      statusHandler(err, res, analysis);
    });
  }

  getSingle(req, res) {
    Analysis.findOne({_id: req.params._id}, (err, analysis) => {
      statusHandler(err, res, analysis);
    });
  }

  createAnalysis(req, res) {
    const analysis = new Analysis(req.body.analysis);
    analysis._creator = req.user._id;
    analysis.save(err => {
      statusHandler(err, res, analysis);
    });
  }

  deleteAnalysis(req, res) {
    Analysis.findOneAndRemove({_id: req.params._id}, (err, analysis) => {
      statusHandler(err, res, analysis);
    });
  }

  editAnalysis(req, res) {
    res.send({});
  }

}

export default AnalysisController;
