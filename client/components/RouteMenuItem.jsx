import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';
import FluxComponent from 'flummox/component';

class RouteMenuItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.flux.getActions('datalytics').openPage(this.props.route);
  }

  render() {
    return (
      <mui.ListItem
        onClick={this.handleClick.bind(this)}
        leftIcon={<FontAwesome
        name={this.props.icon}
        size='1x'
      />} primaryText={this.props.text} />
    );
  }

}

export default RouteMenuItem;
