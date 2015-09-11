import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  idTwitter: String,
  screen_name: String,
  name: String,
  location: String,
  url: String,
  followers_count: Number,
  friends_count: Number,
  listed_count: Number,
  created_at: Date,
  favourites_count: Number,
  utc_offset: Number,
  time_zone: String,
  lang: String,
  token: String,
  tokenSecret: String,
  profile_image_url: String,
  analysis: [{type: mongoose.Schema.Types.ObjectId, ref: 'Analysis'}],
}, {strict: true});

const User = mongoose.model('User', userSchema);

export default User;
