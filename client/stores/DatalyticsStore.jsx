import { Store } from 'flummox';

class DatalyticsStore extends Store {

  constructor(flux) {
    super();

    const datalyticsActions = flux.getActionIds('datalytics');
    this.register(datalyticsActions.getStatus, this.handleNewStatus);
    this.register(datalyticsActions.openPage, this.handleNewPage);

    this.state = {
      logged: false,
      user: null,
      currentPage: 'my_analysis',
    };
  }

  handleNewStatus(content) {
    this.setState(content);
  }

  handleNewPage(page) {
    this.setState({currentPage: page});
  }

}

export default DatalyticsStore;
