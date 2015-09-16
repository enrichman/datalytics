import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  keywords: { type: [String], required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  created_at: { type: Date, required: true },
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User', index: true, required: true },
  comments: {type: mongoose.Schema.Types.Number, default: 0},
  reach: {type: mongoose.Schema.Types.Number, default: 0},
}, {strict: true});

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
