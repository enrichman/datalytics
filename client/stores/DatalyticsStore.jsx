import { Store } from 'flummox';

class DatalyticsStore extends Store {

  constructor(flux) {
    super();

    const datalyticsActions = flux.getActionIds('datalytics');
    this.register(datalyticsActions.getStatus, this.handleNewStatus);
    this.register(datalyticsActions.getMyAnalysis, this.handleMyAnalysis);
    this.register(datalyticsActions.openPage, this.handleNewPage);
    this.register(datalyticsActions.createNewAnalysis, this.handleCreationAnalysis);

    this.state = {
      logged: false,
      user: null,
      currentPage: 'my_analysis',
      analysis: [],
    };
  }

  handleNewStatus(content) {
    this.setState(content);
  }

  handleMyAnalysis(analysis) {
    this.setState({analysis: analysis});
  }

  handleCreationAnalysis(analysis) {
    console.log(analysis);
    this.setState({analysis: this.state.analysis.concat([analysis])});
  }

  handleNewPage(page) {
    this.setState({currentPage: page});
  }

}

export default DatalyticsStore;
