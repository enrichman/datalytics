import React from 'react';
import { Avatar } from 'material-ui';

class AvatarTwitter extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.logged ? <Avatar size={45} src={this.props.user.profile_image_url}/> : null;
  }

}

export default AvatarTwitter;
