import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';
import FluxComponent from 'flummox/component';

class RoutePrefered extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Preferiti</h1>
        <mui.Card style={{width: '90%'}}>
          <mui.CardHeader
            title="Apple"
            subtitle="iPhone, iPad, Apple watch"
            avatar={<mui.Avatar>A</mui.Avatar>}/>
          <mui.CardHeader
            title="Google"
            subtitle="Android, Google"
            avatar={<mui.Avatar>G</mui.Avatar>}/>
          <mui.CardHeader
            title="Samsung"
            subtitle="Note S5, TV, Elettrodomestici"
            avatar={<mui.Avatar>S</mui.Avatar>}/>
          <mui.CardHeader
            title="Datalytics"
            subtitle="Big data, Twitter, Social Network"
            avatar={<mui.Avatar>D</mui.Avatar>}/>
        </mui.Card>
      </div>
    );
  }

}

export default RoutePrefered;
