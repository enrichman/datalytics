import React from 'react';

class AnalysisDetails extends React.Component {

  constructor(props) {
    super(props);
    this.props.flux.getActions('datalytics').getOneAnalysis(props.params.id);
  }

  render() {
    let props;
    if (this.props) {
      props = this.props;
    }
    return (<h1>{props.currentAnalysis.title}</h1>);
  }

}

export default AnalysisDetails;
