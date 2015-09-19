import Analysis from '../models/Analysis';
import TimeSeriesSentiment from '../models/TimeSeriesSentiment';
import TimeSeries from '../models/TimeSeries';
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
            (e, timeseriesSentiment) => {
              if (e) console.log(e);
              TimeSeries.getHitsByChannel('keyword/' + keyword, req.query.granularity, req.query.period,
                (e, timeseries) => {
                  if (e) console.log(e);
                  timeseriesSentiment.forEach((row, index) => {
                    timeseriesSentiment[index][0] = timeseries[index][1];
                    timeseriesSentiment[index][1] = (timeseriesSentiment[index][1] / timeseries[index][1]) || 0;
                  });
                  cb(null, {name: keyword, data: timeseriesSentiment });
                });
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
