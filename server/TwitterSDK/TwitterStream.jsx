import TweetModel from './models/TweetModel';
import ChannelModel from './models/ChannelModel';
import TwitterClient from 'twitter-stream-channels';
import async from 'async';

export default class TwitterStream {

  constructor(scServer, credentials) {
    this.scServer = scServer;

    this.credentials = credentials;
    this.channels = {};
    this.connections = async.queue((tasks, callback) => {
      setTimeout(callback, 10000);
    }, 1);

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
    console.log(channel + ' >>> ', tweet.text);
  }

  /**
   * La registrazione di un nuovo channel comporta l'apertura
   * di una nuova connessione con il client di Twitter.
   * Twitter impone come tempo minimo tra l'apertura di una connessione
   * ed un'altra 10 secondi. Per questo motivo la registrazione di un canale
   * finisce in una coda di funzioni definita nel costruttore,
   * e denominata connections. Tali funzioni vengono eseguite con un
   * timeout di 10 secondi.
   * @param name
   * @param keywords
   */
  registerChannel(name = '', keywords = []) {
    this.connections.push({name: 'connection'}, err => {
      if (this.stream) {
        this.stream.stop();
      }
      this.channels[name] = keywords;
      this.twitterClient = new TwitterClient(this.credentials);
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
