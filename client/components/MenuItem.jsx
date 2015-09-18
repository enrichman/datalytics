import React from 'react';
import { ListItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';

class MenuItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<ListItem disabled={true} leftIcon={<FontAwesome name={this.props.icon} size="lg" />} primaryText={this.props.text} />);
  }

}

export default MenuItem;
