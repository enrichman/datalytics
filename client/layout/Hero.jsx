import React from 'react';
import { Styles } from 'material-ui';

class Datalytics extends React.Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.context = context;
  }

  getChildContext() {
    return { muiTheme: new Styles.ThemeManager().getCurrentTheme() };
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

export default Datalytics;
