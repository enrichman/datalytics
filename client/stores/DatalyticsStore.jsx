import { Store } from 'flummox';

class DatalyticsStore extends Store {

  constructor(flux) {
    super();

    const datalyticsActions = flux.getActionIds('datalytics');

    this.registerAsync(datalyticsActions.getStatus, this.loading, this.handleNewStatus);
    this.registerAsync(datalyticsActions.getMyAnalysis, this.loading, this.handleMyAnalysis);
    this.registerAsync(datalyticsActions.createNewAnalysis, this.loading, this.handleCreationAnalysis);
    this.registerAsync(datalyticsActions.getOneAnalysis, this.loading, this.handleOneAnalysis);

    this.register(datalyticsActions.openPage, this.handleNewPage);

    this.state = {
      logged: true,
      user: null,
      analysis: [],
      currentAnalysis: {},
    };
  }

  /**
   * TODO: Una screen per il loading della pagina.
   */
  loading() {}

  handleNewStatus(content) {
    this.setState(content);
  }

  handleMyAnalysis(analysis) {
    this.setState({analysis: analysis});
  }

  handleOneAnalysis(currentAnalysis) {
    this.setState({currentAnalysis: currentAnalysis});
  }

  handleCreationAnalysis(analysis) {
    this.setState({analysis: this.state.analysis.concat([analysis])});
  }

  handleNewPage(page) {
    this.setState({currentPage: page});
  }

}

export default DatalyticsStore;
