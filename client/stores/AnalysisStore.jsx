import { Store } from 'flummox';

class AnalysisStore extends Store  {

  constructor(flux) {
    super();

    const analysisAction = flux.getActionIds('analysis');

    flux.getActions('analysis').getAllAnalysisByUserID('a');

    this.registerAsync(analysisAction.getAllAnalysisByUserID, () => {},  this.handleAllUserAnalysis);
    this.registerAsync(analysisAction.createNewAnalysis, () => {}, this.handleCreationAnalysis);

    this.state = {
      usersAnalysis: [],
    };
  }

  handleAllUserAnalysis(data) {
    this.setState({usersAnalysis: data});
  }

  handleCreationAnalysis(analysis) {
    this.setState({usersAnalysis: this.state.usersAnalysis.concat([analysis])});
  }

}

export default AnalysisStore;
