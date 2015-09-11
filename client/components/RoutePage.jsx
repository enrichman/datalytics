import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';
import FluxComponent from 'flummox/component';

class RoutePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.name === this.props.currentPage ? (
      <div className="RoutePage">
        <FluxComponent connectToStores={['datalytics']}>
          {this.props.page}
        </FluxComponent>
      </div>)
      : null;
  }

}

export default RoutePage;
