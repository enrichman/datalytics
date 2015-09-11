import React from 'react';
import RouteParser from 'route-parser';

class Route extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const route = new RouteParser(this.props.path);
    const match = route.match(this.props.location.pathname);
    return match ? this.props.page : null;
  }

}

export default Route;
