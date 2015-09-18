import React from 'react';
import FluxComponent from '../../node_modules/flummox/component';
import TwitterButton from './TwitterButton.jsx';
import AvatarTwitter from './AvatarTwitter.jsx';

class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <div>
          <FluxComponent connectToStores={['auth']}>
            <AvatarTwitter />
          </FluxComponent>
        </div>
        <div>
          <FluxComponent connectToStores={['auth']}>
            <TwitterButton />
          </FluxComponent>
        </div>
      </div>
    );
  }

}

export default Toolbar;
