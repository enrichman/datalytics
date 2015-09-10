import { Store } from 'flummox';

class DatalyticsStore extends Store {

  constructor(flux) {
    super();

    const datalyticsActions = flux.getActionIds('datalytics');
    this.register(datalyticsActions.getStatus, this.handleNewStatus);

    this.state = {
      logged: false,
      user: null,
    };
  }

  handleNewStatus(content) {
    this.setState(content);
  }

}

export default DatalyticsStore;
