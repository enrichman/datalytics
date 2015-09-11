import React from 'react';
import mui from 'material-ui';

class Avatar extends React.Component {

  constructor(props) {
    super(props);
  }

  getUser() {
    const props = this.props;
    if (props !== null) {
      return props.user;
    }
    return null;
  }

  render() {
    const props = this.props;
    let user = null;
    if (props !== null) {
      user = props.user;
    }

    return user ? <mui.Avatar size="45" src={user.profile_image_url}/> : null;
  }

}

export default Avatar;
