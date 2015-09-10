import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';
import FluxComponent from 'flummox/component';

class RoutePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.name === this.props.currentPage ? this.props.page : null;
  }

}

export default RoutePage;
