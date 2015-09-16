import { Actions } from 'flummox';
import request from 'request';
import moment from 'moment';
import qs from 'querystring';

class DatalyticsActions extends Actions {

  async getStatus() {
    return await new Promise((resolve, reject) => {
      request('http://datalytics.dev:3000/api/v1/status', (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  async getMyAnalysis(analysis = []) {
    return await new Promise((resolve, reject) => {
      if (analysis.length > 0) {
        resolve(analysis);
        exit;
      }
      request('http://datalytics.dev:3000/api/v1/analysis', (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  async getOneAnalysis(id) {
    return await new Promise((resolve, reject) => {
      request(`http://datalytics.dev:3000/api/v1/analysis/${id}`, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  async createNewAnalysis(analysis) {
    const now = new Date();
    const from = moment(now).subtract(analysis.range, 'days').toDate();
    const obj = {
      analysis: {
        title: analysis.title,
        keywords: analysis.keywords.split(', '),
        created_at: new Date(),
        from: from,
        to: now,
      },
    };
    return await new Promise((resolve, reject) => {
      request.post('http://datalytics.dev:3000/api/v1/analysis',
        {form: obj}, (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(body));
          }
        }
      );
    });
  }

  async getTimeSeries(q) {
    return await new Promise((resolve, reject) => {
      request.get('http://datalytics.dev:3000/api/v1/timeseries?' + qs.stringify(q),
        (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            console.log(JSON.parse(body));
            resolve(JSON.parse(body));
          }
        }
      );
    });
  }

  openPage(page) {
    return page;
  }

}

export default DatalyticsActions;
