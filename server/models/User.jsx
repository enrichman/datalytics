import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = new mongoose.Schema({
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
