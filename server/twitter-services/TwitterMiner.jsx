import Analysis from './../models/Analysis';
import { twitterServices } from './';
import tweetSchema from './../schemas/tweetSchema';
import mongoose from 'mongoose';
import _ from 'lodash';

class TwitterMiner {

  /**
   * Apro un channel per ogni analisi e
   * per ogni keyword di ogni analisi.
   */
  constructor() {
    this.channels = {};
    Analysis.find({}, (err, data) => {
      if (data.length > 0) {
        data.forEach(analysis => {
          this.addAnalysis(analysis, false);
        });
        twitterServices.getTwitterStream().registerChannels(this.channels);
      }
    });
  }

  /**
   * Inserisce i channels relativi ad un'analisi in
   * this.channels.
   * @param analysis
   */
  addAnalysis(analysis = {}, register = true) {
    this.channels = _.merge(this.channels, {[analysis._id]: analysis.keywords});
    twitterServices.getTwitterStream().on(analysis.id, this.saveTweet);
    analysis.keywords.forEach(keyword => {
      this.channels = _.merge(this.channels, {[keyword]: [keyword]});
    });
    if (register) {
      twitterServices.getTwitterStream().registerChannels(this.channels);
    }
  }

  /**
   * Saves a tweet.
   * @param tweet
   * @param idAnalysis
   */
  saveTweet(tweet, idAnalysis) {
    const nameCollection = 'tweet/' + idAnalysis;
    const Tweet = mongoose.model(nameCollection, tweetSchema, nameCollection);
    const tweetEntity = new Tweet(tweet);
    tweetEntity._analysis = idAnalysis;
    tweetEntity.save(err => {
      if (err) console.log(err);
    });
  }

}

export default TwitterMiner;
