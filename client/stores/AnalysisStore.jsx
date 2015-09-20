import { Store } from 'flummox';
import _ from 'lodash';

class AnalysisStore extends Store  {

  constructor(flux) {
    super();

    this.flux = flux;

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

  async getAnalysis(id) {
    return new Promise((resolve, reject) => {
      const analysis = _.findKey(this.state.usersAnalysis, analysis => analysis._id === id);
      if (analysis) resolve(analysis);
      this.flux.getActions('analysis').getAnalysis(id).then(a => {
        resolve(a);
      });
    });
  }

}

export default AnalysisStore;
