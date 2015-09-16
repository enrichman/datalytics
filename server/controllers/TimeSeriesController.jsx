import TimeSeries from 'redis-timeseries';
import Redis from 'redis';

class TimeSeriesController {

  static getTimeSeries(req, res) {
    const redis = Redis.createClient();
    const ts = new TimeSeries(redis, 'timeseries');
    ts.getHits(req.query.key, req.query.granularity, req.query.period,
      (err, data) => {
        if (err) res.send(err);
        res.send(data);
      });
  }

}

export default TimeSeriesController;
