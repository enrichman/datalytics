import React from 'react';
import { TextField, RaisedButton, SelectField } from 'material-ui';

class FormCreateAnalysis extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      title: null,
      keywords: null,
      range: null,
    };
  }

  handleClick() {
    this.setState({title: null, keywords: null, range: null});
    this.props.flux.getActions('analysis').createNewAnalysis(this.state);
  }

  handleChangeRange(event) {
    const state = {};
    state.range = event.target.value;
    this.setState(state);
  }

  handleChange(event) {
    const state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <form className="FormCreateAnalysis">
        <h2>Crea una nuova analisi</h2>
        <TextField
          value={this.state.title}
          name="title"
          fullWidth={true}
          onChange={this.handleChange.bind(this)}
          hintText="Titolo analisi" />
        <TextField
          value={this.state.keywords}
          name="keywords"
          fullWidth={true}
          onChange={this.handleChange.bind(this)}
          hintText="Keywords analisi" />
        <SelectField
          value={this.state.range}
          hintText="Range temporale"
          name="range"
          fullWidth={true}
          onChange={this.handleChangeRange.bind(this)}
          menuItems={[{text: 'Ultime 24 ore', payload: 1}, {text: 'Ultima settimana', payload: 7}, {text: 'Ultimo mese', payload: 30}]} />
        <RaisedButton onClick={this.handleClick.bind(this)} secondary={true} label="crea analisi" />
      </form>
    );
  }

}

export default FormCreateAnalysis;
