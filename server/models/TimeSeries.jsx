import TimeSeriesRedis from 'redis-timeseries';
import Redis from 'redis';
import config from 'config';

class TimeSeries {

  static timeSeriesRedis = new TimeSeriesRedis(Redis.createClient(config.databases.redis.port,
      config.databases.redis.host), 'timeseries', {
    '1second': {
      ttl: 31536000,
      duration: 1,
    },
    '1minute': {
      ttl: 31536000,
      duration: 60,
    },
    '5minutes': {
      ttl: 31536000,
      duration: 300,
    },
    '10minutes': {
      ttl: 31536000,
      duration: 600,
    },
    '1hour': {
      ttl: 31536000,
      duration: 3600,
    },
    '1day': {
      ttl: 31536000,
      duration: 86400,
    },
  });

  static recordHit(channel) {
    TimeSeries.timeSeriesRedis.recordHit(channel).exec();
  }

  static getHitsByChannel(channel, granularity, period, cb) {
    TimeSeries.timeSeriesRedis.getHits(channel, granularity, period, (err, timeseries) => {
      cb(err, timeseries);
    });
  }

  static getHitsByAnalysis(_id, granularity, period, cb) {
    return null;
  }

}

export default TimeSeries;
