import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';

class RouteMenuItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick() {
    const props = this.props;
    if (props !== null) {
      props.flux.getActions('datalytics').openPage(this.props.route);
    }
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
      <mui.ListItem
        onClick={this.handleClick.bind(this)}
        leftIcon={<FontAwesome
        name={icon}
        size="lg"
      />} primaryText={text} />
    );
  }

}

export default RouteMenuItem;
