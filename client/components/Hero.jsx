import React from 'react';
import mui from 'material-ui';
import TwitterButton from './TwitterButton.jsx';
import FluxComponent from 'flummox/component';

class Hero extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Hero">
        <h1>DatalyticsUrl</h1>
        <h2>We make sense of big data.</h2>
      </div>
    );
  }

}

export default Hero;
