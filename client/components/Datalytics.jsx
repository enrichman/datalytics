import React from 'react';
import TwitterButton from './TwitterButton.jsx';
import Toolbar from './Toolbar.jsx';
import Hero from './Hero.jsx';
import FluxComponent from 'flummox/component';
import * as mui from 'material-ui';

class Datalytics extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { muiTheme: new mui.Styles.ThemeManager().getCurrentTheme() };
  }

  render() {
    return (
      <div className="Datalytics">
        <Toolbar />
        <Hero />
      </div>
    );
  }

}

Datalytics.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Datalytics;
