import { Actions } from 'flummox';
import request from 'request';

class AuthActions extends Actions {

  async login() {
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

}

export default AuthActions;
