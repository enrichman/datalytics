import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  keywords: { type: [String], required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  created_at: { type: Date, required: true },
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User', index: true, required: true },
  tweets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tweet'}],
}, {strict: true});

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
