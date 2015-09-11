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

  getChildContext() {
    return { muiTheme: new mui.Styles.ThemeManager().getCurrentTheme() };
  }

  componentWillMount() {
    const props = this.props;
    if (props !== null) {
      props.flux.getActions('datalytics').getStatus();
      props.flux.getActions('datalytics').getMyAnalysis();
    }
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
