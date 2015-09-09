import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = new mongoose.Schema({
  twitter_id: {
    type: String,
    index: true,
    unique: true,
  },
  twitter_token: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
}, {strict: true});

userSchema.plugin(findOrCreate);

userSchema.methods = {
  hello: () => {
    return true;
  },
};

const User = mongoose.model('User', userSchema);

export default User;
