import React from 'react';
import { RaisedButton } from 'material-ui';

class TwitterButton extends React.Component {

  constructor(props) {
    super(props);
  }

  getButton() {
    const props = this.props;
    if (props.logged) {
      return {uri: '/api/v1/logout', text: 'logout'};
    }
    return {uri: '/api/v1/login', text: 'accedi con twitter'};
  }

  render() {
    const button = this.getButton();
    return (
      <div className="TwitterButton">
        <RaisedButton linkButton={true} href={button.uri} label={button.text} />
      </div>
    );
  }

}

export default TwitterButton;
