import mongoose from 'mongoose';

/**
 * Based on
 * https://dev.twitter.com/overview/api/tweets
 * @type {*|Schema}
 */
const tweetSchema = new mongoose.Schema({
  _analysis: { type: mongoose.Schema.ObjectId, ref: 'Analysis', index: true, required: true },
  annotations: Object,
  contributors: Object,
  coordinates: Object,
  created_at: Date,
  current_user_retweet: Object,
  entities: Object,
  favorite_count: Number,
  favorited: Boolean,
  filter_level: String,
  id_str: String,
  in_reply_to_screen_name: String,
  in_reply_to_status_id_str: String,
  in_reply_to_user_id_str: String,
  lang: String,
  place: Object,
  possibly_sensitive: Boolean,
  quoted_status_id_str: String,
  quoted_status: Object,
  scopes: Object,
  retweet_count: Number,
  retweeted: Boolean,
  retweeted_status: Object,
  source: String,
  text: String,
  trucated: String,
  user: Object,
  withheld_copyright: Boolean,
  withheld_in_countries: Array,
  withheld_scope: String,
}, {strict: true});

export default tweetSchema;
