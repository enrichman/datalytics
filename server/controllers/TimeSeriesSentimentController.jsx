import Analysis from '../models/Analysis';
import TimeSeriesSentiment from '../models/TimeSeriesSentiment';
import async from 'async';

class TimeSeriesSentimentController {

  static getTimeSeries(req, res) {
    Analysis.findOne({_id: req.query.key}, (err, analysis) => {
      if (err) next(err);
      const keywords = analysis.keywords;
      const queries = [];
      keywords.forEach(keyword => {
        queries.push((cb) => {
          TimeSeriesSentiment.getHitsByChannel('keyword/' + keyword, req.query.granularity, req.query.period,
            (e, timeseries) => {
              if (e) console.log(e);
              cb(null, {name: keyword, type: req.query.type || 'area',  data: timeseries});
            });
        });
      });
      async.series(queries, (e, results) => {
        res.send(results);
      });
    });
  }

}

export default TimeSeriesSentimentController;
