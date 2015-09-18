import { Flux } from 'flummox';
import { AuthActions, AnalysisActions, SocketActions } from './actions/index.jsx';
import { AuthStore, AnalysisStore, SocketStore } from './stores/index.jsx';

class AppFlux extends Flux {

  constructor() {
    super();
    this.createActions('auth', AuthActions);
    this.createStore('auth', AuthStore, this);

    this.createActions('socket', SocketActions);
    this.createStore('socket', SocketStore, this);

    this.createActions('analysis', AnalysisActions);
    this.createStore('analysis', AnalysisStore, this);
  }

}

export default AppFlux;
