import React from 'react';

class Hero extends React.Component {

  static propTypes = {
    logged: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.logged ? (
      <div className="Hero">
        <h1>DatalyticsUrl</h1>
        <h2>We make sense of big data.</h2>
      </div>
    ) : null;
  }

}

export default Hero;
