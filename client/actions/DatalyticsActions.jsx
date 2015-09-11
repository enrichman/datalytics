import { Actions } from 'flummox';
import request from 'request';

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

  async getMyAnalysis() {
    return await new Promise((resolve, reject) => {
      request('http://datalytics.dev:3000/api/v1/analysis', (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  async createNewAnalysis(analysis) {
    const tmp = {
      analysis: {
        title: 'Apple',
        keywords: 'iPhone, iPad',
        created_at: new Date(),
        from: new Date(),
        to: new Date(),
      },
    };
    return await new Promise((resolve, reject) => {
      request.post('http://datalytics.dev:3000/api/v1/analysis',
        {form: tmp}, (err, response, body) => {
          if (err) {
            reject(err);
          } else {
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
