import TwitterStream from './TwitterStream';
import TwitterMiner from './TwitterMiner';
import config from 'config';

const singleton = Symbol();

class TwitterServices {

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new TwitterServices;
    }
    return this[singleton];
  }

  constructor() {
    this.twitterStream = new TwitterStream(config.twitterStream);
    this.twitterMiner = new TwitterMiner;
  }

  getTwitterStream() {
    return this.twitterStream;
  }

  getTwitterMiner() {
    return this.twitterMiner;
  }

}

export default TwitterServices.instance;