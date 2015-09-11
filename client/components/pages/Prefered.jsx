import React from 'react';
import { Card, CardHeader, Avatar } from 'material-ui';

class RoutePrefered extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Preferiti</h1>
        <Card style={{width: '90%'}}>
          <CardHeader
            title="Apple"
            subtitle="iPhone, iPad, Apple watch"
            avatar={<Avatar>A</Avatar>}/>
          <CardHeader
            title="Google"
            subtitle="Android, Google"
            avatar={<Avatar>G</Avatar>}/>
          <CardHeader
            title="Samsung"
            subtitle="Note S5, TV, Elettrodomestici"
            avatar={<Avatar>S</Avatar>}/>
          <CardHeader
            title="Datalytics"
            subtitle="Big data, Twitter, Social Network"
            avatar={<Avatar>D</Avatar>}/>
        </Card>
      </div>
    );
  }

}

export default RoutePrefered;
