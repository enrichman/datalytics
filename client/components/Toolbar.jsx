import React from 'react';
import mui from 'material-ui';
import TwitterButton from './TwitterButton.jsx';
import Avatar from './Avatar.jsx';
import FluxComponent from 'flummox/component';
class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <div>
          <FluxComponent connectToStores={['datalytics']}>
            <Avatar />
          </FluxComponent>
        </div>
        <div>
          <FluxComponent connectToStores={['datalytics']}>
            <TwitterButton />
          </FluxComponent>
        </div>
      </div>
    );
  }

}

export default Toolbar;
