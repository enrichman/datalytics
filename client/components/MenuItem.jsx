import React from 'react';
import { ListItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';

class MenuItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    let icon;
    let text;

    if (props !== null) {
      icon = props.icon;
      text = props.text;
    }

    return (
      <ListItem
        leftIcon={<FontAwesome
        name={icon}
        size="lg"
      />} primaryText={text} />
    );
  }

}

export default MenuItem;
