import React from 'react';
import TwitterButton from './widgets/TwitterButton.jsx';
import Toolbar from './widgets/Toolbar.jsx';
import Hero from './pages/Hero.jsx';
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
        <FluxComponent connectToStores={['datalytics']}>
          <Toolbar />
          <Hero />
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
