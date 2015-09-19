import TimeSeriesRedis from 'redis-timeseries';
import Redis from 'redis';

class TimeSeriesSentiment {

  static timeSeriesRedis = new TimeSeriesRedis(Redis.createClient(), 'sentiment', {
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

  static addSentiment(channel, timestamp, value) {
    if (value > 0) {
      TimeSeriesSentiment.timeSeriesRedis.recordHit(channel, timestamp, Math.abs(value)).exec();
    } else {
      TimeSeriesSentiment.timeSeriesRedis.removeHit(channel, timestamp, Math.abs(value)).exec();
    }
  }

  static getHitsByChannel(channel, granularity, period, cb) {
    TimeSeriesSentiment.timeSeriesRedis.getHits(channel, granularity, period, (err, timeseries) => {
      cb(err, timeseries);
    });
  }

  static getHitsByAnalysis(_id, granularity, period, cb) {
    return null;
  }

}

export default TimeSeriesSentiment;