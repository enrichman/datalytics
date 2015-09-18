import React from 'react';
import { Link } from 'react-router';
import { List } from 'material-ui';
import MenuItem from './MenuItem.jsx';

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <Link to="/"><MenuItem icon="area-chart" text="Le mie analisi" /></Link>
        <Link to="/bookmark"><MenuItem icon="bookmark" text="Preferite" /></Link>
        <Link to="/popular"><MenuItem icon="star" text="Popolari" /></Link>
        <Link to="/question"><MenuItem icon="question-circle" text="Assistenza" /></Link>
      </List>
    );
  }

}

export default Menu;
