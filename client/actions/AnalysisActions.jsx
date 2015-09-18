import { Actions } from 'flummox';
import request from 'request';
import moment from 'moment';

class AnalysisActions extends Actions {

  async getAllAnalysisByUserID(userID, analysis = []) {
    return await new Promise((resolve, reject) => {
      if (analysis.length > 0) {
        resolve(analysis);
        exit;
      }
      request(`http://datalytics.dev:3000/api/v1/user/${userID}/analysis/`, (err, response, body) => {
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
          err ? reject(err) : resolve(JSON.parse(body));
        }
      );
    });
  }

}

export default AnalysisActions;
