import EventEmitter from 'pattern-emitter';
import TwitterClient from 'twitter-stream-channels';
import async from 'async';
import _ from 'lodash';

class TwitterStream extends EventEmitter {

  constructor(credentials) {
    super();
    this.stream = null;
    this.channels = {};
    this.credentials = credentials;
    this.connections = this._createConnections();
  }

  /**
   * When an istance of TwitterStream is created, the constructor
   * use this method to create the connections.
   * @returns {Array}
   */
  _createConnections() {
    const credentials = this.credentials;
    const connections = [];
    credentials.forEach(tokens => {
      connections.push({
        tokens: tokens,
        queue: async.queue((tasks, callback) => {
          setTimeout(callback, 10000 / credentials.length);
        }, 1),
      });
    });

    return connections;
  }

  /**
   * Push channels
   * @param channelsToPush
   */
  pushChannels(channelsToPush) {
    const connection = this._getLessUsedConnection();
    connection.queue.push({name: 'connection'}, err => {
      if (err) throw err;
      if (this.stream) this._stop();
      this._setStream(connection.tokens, this._mergeChannels(channelsToPush));
      const keyChannels = this._getKeyChannels();

      keyChannels.forEach(key => {
        this._openChannel(key);
      });
    });
  }

  _openChannel(idChannel) {
    this._getStream().on('channels/' + idChannel, tweet => {
      this.emit(idChannel, tweet, idChannel);
    });
  }

  /**
   * Return the less used connection.
   * @returns {*}
   */
  _getLessUsedConnection() {
    const connections = this._getConnections();
    let lessUsedConnection = connections[0];

    connections.forEach(c => {
      if (c.queue.length() < lessUsedConnection.queue.length()) {
        lessUsedConnection = c;
      }
    });

    return lessUsedConnection;
  }

  _getCredentials() {
    return this.credentials;
  }

  _getConnections() {
    return this.connections;
  }

  _getKeyChannels() {
    const channels = this._getChannels();
    return Object.keys(channels);
  }

  _getChannels() {
    return this.channels;
  }

  _setChannels(channels) {
    this.channels = channels;
  }

  _mergeChannels(channels) {
    const result = _.merge(this._getChannels(), channels);
    this._setChannels(result);
    return this._getChannels();
  }

  _setTwitterClient(tokens) {
    this.twitterClient = new TwitterClient(tokens);
  }

  _stop() {
    this.stream.stop();
  }

  _getStream() {
    return this.stream;
  }

  _setStream(tokens, channels) {
    const twitterClient = new TwitterClient(tokens);
    if (!_.isEmpty(channels)) {
      this.stream = twitterClient.streamChannels({track: channels});
    }
  }

}

export default TwitterStream;
