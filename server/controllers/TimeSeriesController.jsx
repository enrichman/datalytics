import TimeSeries from 'redis-timeseries';
import Redis from 'redis';
import Analysis from '../models/Analysis';
import async from 'async';

class TimeSeriesController {

  static getTimeSeries(req, res) {
    const redis = Redis.createClient();
    const ts = new TimeSeries(redis, 'timeseries');

    Analysis.findOne({_id: req.query.key}, (err, analysis) => {
      if (err) next(err);
      const keywords = analysis.keywords;
      const data = [];
      const queries = [];
      keywords.forEach(keyword => {
        queries.push((cb) => {
          ts.getHits('keyword/' + keyword, req.query.granularity, req.query.period,
            (e, timeseries) => {
              if (e) res.send(e);
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

export default TimeSeriesController;
