import React from 'react';

class AnalysisDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let props;
    if (this.props) {
      props = this.props;
    }
    return (<h1>Analysis {props.params.id}</h1>);
  }

}

export default AnalysisDetails;
