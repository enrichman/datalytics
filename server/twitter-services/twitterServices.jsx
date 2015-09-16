import TwitterStream from './TwitterStream';
import TwitterMiner from './TwitterMiner';
import config from 'config';
import Analysis from './../models/Analysis';
import _ from 'lodash';

const singleton = Symbol();

class TwitterServices {

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new TwitterServices();
    }
    return this[singleton];
  }

  _createTwitterStream(options, cb) {
    this.twitterStream = new TwitterStream(options);
    this._getChannelsToPush(channels => {
      this.twitterStream.pushChannels(channels);
      cb(this.twitterStream);
    });
  }

  _getChannelsToPush(cb) {
    let channels = {};
    Analysis.find({}, (err, data) => {
      data.forEach(analysis => {
        channels = _.merge(channels, {['analysis/' + analysis._id]: analysis.keywords});
        analysis.keywords.forEach(keyword => {
          channels = _.merge(channels, {['keyword/' + keyword]: keyword});
        });
      });
      cb(channels);
    });
  }

  pushAnalysis(analysis) {
    let channels = {};
    channels = _.merge(channels, {['analysis/' + analysis._id]: analysis.keywords});
    analysis.keywords.forEach(keyword => {
      channels = _.merge(channels, {['keyword/' + keyword]: keyword});
    });
    this.getTwitterStream().then(twitterStream => {
      twitterStream.pushChannels(channels);
    });
  }

  async getTwitterStream() {
    return new Promise((resolve) => {
      if (this.twitterStream) {
        resolve(this.twitterStream);
      } else {
        this._createTwitterStream(config.twitterStream, twitterStream => {
          this.twitterStream = twitterStream;
          resolve(twitterStream);
        });
      }
    });
  }

}

export default TwitterServices.instance;
