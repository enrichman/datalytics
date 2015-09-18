import { Flux } from 'flummox';
import { AuthActions, AnalysisActions, SocketActions, TimeSeriesActions } from './actions/index.jsx';
import { AuthStore, AnalysisStore, SocketStore, TimeSeriesStore } from './stores/index.jsx';

class AppFlux extends Flux {

  constructor() {
    super();
    this.createActions('auth', AuthActions);
    this.createStore('auth', AuthStore, this);

    this.createActions('socket', SocketActions);
    this.createStore('socket', SocketStore, this);

    this.createActions('analysis', AnalysisActions);
    this.createStore('analysis', AnalysisStore, this);

    this.createActions('timeSeries', TimeSeriesActions);
    this.createStore('timeSeries', TimeSeriesStore, this);
  }

}

export default AppFlux;
