import { Flux } from 'flummox';
import DatalyticsActions from './actions/DatalyticsActions.jsx';
import DatalyticsStore from './stores/DatalyticsStore.jsx';
import RouterActions from './Router/actions/RouteActions.jsx';
import RouterStore from './Router/stores/RouteStore.jsx';

class AppFlux extends Flux {

  constructor() {
    super();
    this.createActions('datalytics', DatalyticsActions);
    this.createStore('datalytics', DatalyticsStore, this);
    this.createActions('route', RouterActions);
    this.createStore('route', RouterStore, this);
  }

}

export default AppFlux;