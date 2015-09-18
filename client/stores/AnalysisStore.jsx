import { Store } from 'flummox';

class AnalysisStore extends Store  {

  constructor(flux) {
    super();

    const analysisAction = flux.getActionIds('analysis');

    flux.getActions('analysis').getAllAnalysisByUserID('a');

    this.register(analysisAction.getAllAnalysisByUserID,  this.handleAllUserAnalysis);
    this.register(analysisAction.getAnalysis, this.handleSingleAnalysis);
    this.register(analysisAction.createNewAnalysis, this.handleCreationAnalysis);

    this.state = {
      usersAnalysis: [],
    };
  }

  handleAllUserAnalysis(data) {
    this.setState({usersAnalysis: data});
  }

  handleSingleAnalysis(analysis) {
    this.setState({usersAnalysis: this.state.usersAnalysis.concat([analysis])});
  }

  handleCreationAnalysis(analysis) {
    this.setState({usersAnalysis: this.state.usersAnalysis.concat([analysis])});
  }

}

export default AnalysisStore;
