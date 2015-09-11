import React from 'react';
import mui from 'material-ui';

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
    const props = this.props;
    if (props !== null) {
      this.setState({title: null, keywords: null, range: null});
      props.flux.getActions('datalytics').createNewAnalysis(this.state);
    }
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
        <mui.TextField
          value={this.state.title}
          name="title"
          fullWidth={true}
          onChange={this.handleChange.bind(this)}
          hintText="Titolo analisi" />
        <mui.TextField
          value={this.state.keywords}
          name="keywords"
          fullWidth={true}
          onChange={this.handleChange.bind(this)}
          hintText="Keywords analisi" />
        <mui.SelectField
          value={this.state.range}
          hintText="Range temporale"
          name="range"
          fullWidth={true}
          onChange={this.handleChangeRange.bind(this)}
          menuItems={[{text: 'Ultime 24 ore', payload: 1}, {text: 'Ultima settimana', payload: 7}, {text: 'Ultimo mese', payload: 30}]} />
        <mui.RaisedButton onClick={this.handleClick.bind(this)} secondary={true} label="crea analisi" />
      </form>
    );
  }

}

export default FormCreateAnalysis;
