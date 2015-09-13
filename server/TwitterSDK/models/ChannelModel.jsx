import mongoose from 'mongoose';

const channelModel = new mongoose.Schema({}, {strict: true});

const ChannelModel = mongoose.model('Channel', channelModel);

export default ChannelModel;
