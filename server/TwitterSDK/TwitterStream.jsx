import TwitterClient from 'twitter-stream-channels';
import async from 'async';
import { EventEmitter } from 'events';
import _ from 'lodash';
import config from 'config';

const singleton = Symbol();

class TwitterStream extends EventEmitter {

  constructor(credentials) {
    super();
    this.channels = {};
    this.connections = [];
    credentials.forEach(tokens => {
      this.connections.push({
        tokens: tokens,
        queue: async.queue((tasks, callback) => {
          setTimeout(callback, 10000 / credentials.length);
        }, 1),
      });
    });
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new TwitterStream(config.twitterStream);
    }
    return this[singleton];
  }

  /**
   * La registrazione di un nuovo channel comporta l'apertura
   * di una nuova connessione con il client di Twitter.
   * Twitter impone come tempo minimo tra l'apertura di una connessione
   * ed un'altra 10 secondi. Per questo motivo la registrazione di un canale
   * finisce in un array di code di funzioni definite nel costruttore. La coda
   * che viene scelta come papabile per la connessione corrente è scelta in base
   * a quella che risulta meno satura, ovvero con il minor numero
   * di processi in coda.
   * @param name
   * @param keywords
   */
  registerChannels(channels) {
    let connection = this.connections[0];

    /**
     * Controllo quale sia la connessione
     * con la coda meno satura.
     */
    this.connections.forEach(c => {
      if (c.queue.length() < connection.queue.length()) {
        connection = c;
      }
    });

    connection.queue.push({name: 'connection'}, err => {
      if (this.stream) {
        this.stream.stop();
      }
      this.channels = _.merge(this.channels, channels);
      this.twitterClient = new TwitterClient(connection.tokens);
      this.stream = this.twitterClient.streamChannels({track: this.channels});

      const arrayChannels = [];
      for (const nameChannel in this.channels) {
        arrayChannels.push(nameChannel);
      }
      arrayChannels.forEach(channel => {
        this.stream.on('channels/' + channel, tweet => {
          this.emit(channel, tweet);
        });
      });
    });
  }

}

export default TwitterStream.instance;
