import React from 'react';

class NavItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick() {
    const props = this.props;
    if (props !== null) {
      props.flux.getActions('route').openPage(props.href);
    }
  }

  render() {
    return (<div onClick={this.handleClick.bind(this)}>{this.props.handler}</div>);
  }

}

export default NavItem;
