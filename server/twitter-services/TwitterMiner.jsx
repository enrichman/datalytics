import { twitterServices } from './';
import tweetSchema from './../schemas/tweetSchema';
import mongoose from 'mongoose';
import TimeSeries from './../models/TimeSeries';
import TimeSeriesSentiment from './../models/TimeSeriesSentiment';
import sentiment from 'sentiment';

class TwitterMiner {

  start() {
    twitterServices.getTwitterStream().then(twitterStream => {
      twitterStream.on(/keyword\/.*/, (tweet, channel) => {
        this._onKeyword(tweet, channel);
      });
      twitterStream.on(/analysis\/.*/, (tweet, channel) => {
        this._onAnalysis(tweet, channel);
      });
      twitterStream.on(/.*/, (tweet, channel) => {
        this._onAll(tweet, channel);
      });
    });
  }

  /**
   * What do you want to mine when you receive an analysis or a keyword?
   * @param tweet
   * @param _id
   * @private
   */
  _onAll(tweet, channel) {
    const timestamp = Date.now() / 1000 | 0;
    TimeSeries.recordHit(channel);
    sentiment(tweet.text, null, (e, data) => {
      TimeSeriesSentiment.addSentiment(channel, timestamp, data.score);
    });
  }

  /**
   * What do you want to mine when you receive a keyword?
   * @param tweet
   * @param keyword
   * @private
   */
  _onKeyword(tweet, channel) {
    const keyword = this._getIdByChannel(channel);
  }

  /**
   * What do you want to mine when you receive an analysis?
   * @param tweet
   * @param _id
   * @private
   */
  _onAnalysis(tweet, channel) {
    const _id = this._getIdByChannel(channel);
    this._saveTweet(tweet, _id);
  }

  _getIdByChannel(channel) {
    return channel.match(/\/(.*?)$/)[1];
  }

  /**
   * Saves a tweet.
   * @param tweet
   * @param idAnalysis
   */
  _saveTweet(tweet, idAnalysis) {
    const nameCollection = 'tweet/' + idAnalysis;
    const Tweet = mongoose.model(nameCollection, tweetSchema, nameCollection);
    const tweetEntity = new Tweet(tweet);
    tweetEntity._analysis = idAnalysis;
    tweetEntity.save(err => {
      if (err) console.log(err);
    });
  }

}

export default new TwitterMiner;
