import React from 'react';
import mui from 'material-ui';
import FluxComponent from 'flummox/component';

class Avatar extends React.Component {

  constructor(props) {
    super(props);
  }

  getUser() {
    return this.props.user;
  }

  render() {
    const user = this.props.user;
    if (user) {
      return (
          <mui.Avatar size="45" src={user.profile_image_url}/>
      );
    }
    return null;
  }

}

export default Avatar;
