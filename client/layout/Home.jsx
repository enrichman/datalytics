import React from 'react';
import { Styles } from 'material-ui';
import Hero from './Hero.jsx';
import Analysis from './Analysis.jsx';

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
    return !this.props.logged ? <Hero /> : <Analysis />;
  }

}

export default Datalytics;
