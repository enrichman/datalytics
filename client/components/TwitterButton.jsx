import React from 'react';
import mui from 'material-ui';

class TwitterButton extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.flux.getActions('datalytics').getStatus();
  }

  getButton() {
    if (this.props.logged) {
      return {uri: '/api/v1/logout', text: 'logout'};
    }
    return {uri: '/api/v1/login', text: 'accedi con twitter'};
  }

  render() {
    const button = this.getButton();
    return (
      <div className="TwitterButton">
        <mui.RaisedButton linkButton={true} href={button.uri} label={button.text} />
      </div>
    );
  }

}

export default TwitterButton;
