import React from 'react';
import mui from 'material-ui';
import TwitterButton from './TwitterButton.jsx';
import FluxComponent from 'flummox/component';

class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <h1 className="Logo">DatalyticsUrl</h1>
        <FluxComponent connectToStores={['datalytics']}>
          <TwitterButton />
        </FluxComponent>
      </div>
    );
  }

}

export default Toolbar;
