import React from 'react';
import mui from 'material-ui';
import FontAwesome from 'react-fontawesome';
import FluxComponent from 'flummox/component';
import ReactGridLayout from 'react-grid-layout';

class FormCreateAnalysis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FormCreateAnalysis">
        <h2>Crea una nuova analisi</h2>
        <mui.TextField
          fullWidth={true}
          hintText="Titolo analisi" />
        <mui.TextField
          fullWidth={true}
          hintText="Keywords analisi" />
        <mui.SelectField
          fullWidth={true}
          menuItems={[{text: 'Oggi'}, {text: 'Ultima settimana'}, {text: 'Ultimo mese'}]} />
        <mui.RaisedButton secondary={true} label="Crea analisi" />
      </div>
    );
  }

}

export default FormCreateAnalysis;
