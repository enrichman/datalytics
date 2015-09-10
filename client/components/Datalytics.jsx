import React from 'react';
import TwitterButton from './TwitterButton.jsx';
import Toolbar from './Toolbar.jsx';
import Hero from './Hero.jsx';
import Bacheca from './Bacheca.jsx';
import FluxComponent from 'flummox/component';
import * as mui from 'material-ui';

class Datalytics extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.flux.getActions('datalytics').getStatus();
  }

  getChildContext() {
    return { muiTheme: new mui.Styles.ThemeManager().getCurrentTheme() };
  }

  render() {
    return (
      <div className="Datalytics">
        <Toolbar />
        <FluxComponent connectToStores={['datalytics']}>
          <Hero />
        </FluxComponent>
        <FluxComponent connectToStores={['datalytics']}>
          <Bacheca />
        </FluxComponent>
      </div>
    );
  }

}

Datalytics.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Datalytics;
