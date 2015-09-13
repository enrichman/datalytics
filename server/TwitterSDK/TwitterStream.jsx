import TweetModel from './models/TweetModel';
import ChannelModel from './models/ChannelModel';
import TwitterClient from 'twitter-stream-channels';
import async from 'async';

export default class TwitterStream {

  constructor(scServer, credentials) {
    this.scServer = scServer;

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

    this.registerChannel('apple', ['apple']);
    this.registerChannel('microsoft', ['microsoft']);
    this.registerChannel('google', ['google']);
    this.registerChannel('facebook', ['facebook']);
  }

  /**
   * Metodo richiamato alla ricezione di un nuovo tweet.
   * @param channel
   * @param tweet
   */
  onTweet(channel = '', tweet = {}) {
    console.log(channel + ' >>> ');
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
  registerChannel(name = '', keywords = []) {
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
      this.channels[name] = keywords;
      this.twitterClient = new TwitterClient(connection.tokens);
      this.stream = this.twitterClient.streamChannels({track: this.channels});

      const arrayChannels = [];
      for (const nameChannel in this.channels) {
        arrayChannels.push(nameChannel);
      }
      arrayChannels.forEach(channel => {
        this.stream.on('channels/' + channel, tweet => {
          this.onTweet(channel, tweet);
        });
      });
    });
  }

  /**
   * TODO
   */
  run() {
    return;
  }

  /**
   * TODO
   */
  stop() {
    return;
  }

  /**
   * TODO: timeout 10s
   */
  reboot() {
    return;
  }

}
