import React from 'react';
import { RaisedButton } from 'material-ui';

class TwitterButton extends React.Component {

  static propTypes = {
    logged: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let button;
    if (this.props.logged) {
      button = {uri: '/api/v1/logout', text: 'logout'};
    } else {
      button = {uri: '/api/v1/login', text: 'accedi con twitter'};
    }

    return (
      <div className="TwitterButton">
        <RaisedButton linkButton={true} href={button.uri} label={button.text} />
      </div>
    );
  }

}

export default TwitterButton;
