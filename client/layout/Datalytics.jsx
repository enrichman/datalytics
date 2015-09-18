import React from 'react';
import FluxComponent from 'flummox/component';
import { Styles } from 'material-ui';
import { Toolbar } from './../components/index.jsx';

class Datalytics extends React.Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { muiTheme: new Styles.ThemeManager().getCurrentTheme() };
  }

  render() {
    const key = this.props.location.pathname;
    return (
      <div className="Datalytics">
        <FluxComponent connectToStores={['auth']}>
          <Toolbar />
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </FluxComponent>
      </div>);
  }

}

export default Datalytics;
