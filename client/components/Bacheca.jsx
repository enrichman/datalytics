import React from 'react';
import mui from 'material-ui';
import TwitterButton from './TwitterButton.jsx';
import FluxComponent from 'flummox/component';

class Bacheca extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.logged ? (
      <div className="Bacheca">
        <mui.Card>
          <mui.CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </mui.CardText>
        </mui.Card>
      </div>
    ) : null;
  }

}

export default Bacheca;
