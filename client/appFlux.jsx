import { Flux } from 'flummox';
import DatalyticsActions from './actions/DatalyticsActions.jsx';
import DatalyticsStore from './stores/DatalyticsStore.jsx';

class AppFlux extends Flux {

  constructor() {
    super();
    this.createActions('datalytics', DatalyticsActions);
    this.createStore('datalytics', DatalyticsStore, this);
  }

}

export default AppFlux;