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
    this.props.flux.getActions('datalytics').getStatus();
  }

  /**
   * TODO socket and chart
   */
  componentDidMount() {
    this.props.socket.on('TWEET', tweet => {
      console.log(tweet);
    });
  }

  getChildContext() {
    return { muiTheme: new mui.Styles.ThemeManager().getCurrentTheme() };
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
