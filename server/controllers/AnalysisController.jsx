import express from 'express';

class AnalysisController {

  constructor() {
    const router = express.Router();
    router.get('/', this.getAll);
    router.get('/:id', this.getSingle);
    router.post('/', this.createAnalysis);
    router.delete('/:id', this.deleteAnalysis);
    router.put('/:id', this.editAnalysis);
    return router;
  }

  getAll(req, res) {
    return res.send({});
  }

  getSingle(req, res) {
    return res.send({});
  }

  createAnalysis(req, res) {
    return res.send({});
  }

  /**
   * Delete an element.
   * @param req
   * @param res
   * @returns {{req: *, res: *}}
   */
  deleteAnalysis(req, res) {
    return res.send({});
  }

  editAnalysis(req, res) {
    return res.send({});
  }

}

export default AnalysisController;
