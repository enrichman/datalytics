import { Actions } from 'flummox';
import request from 'request';
import qs from 'querystring';
import md5 from 'md5';

class TimeSeriesActions extends Actions {

  async getTimeSeries(query) {
    return await new Promise((resolve, reject) => {
      request('http://datalytics.dev:3000/api/v1/timeseries?' + qs.stringify(query), (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve({key: md5(JSON.stringify(query)), data: JSON.parse(body)});
        }
      });
    });
  }

}

export default TimeSeriesActions;