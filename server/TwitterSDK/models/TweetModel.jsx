import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({}, {strict: true});

const TweetModel = mongoose.model('Tweet', tweetSchema);

export default TweetModel;
