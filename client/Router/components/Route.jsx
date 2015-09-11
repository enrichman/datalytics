import React from 'react';

class Route extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.name === this.props.currentPage ? this.props.page : null;
  }

}

export default Route;
