import React from 'react';
import mui from 'material-ui';

class FormCreateAnalysis extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      analysis: {
        title: null,
        keywords: null,
        from: null,
        to: null,
      },
    };
  }

  handleClick() {
    const props = this.props;
    if (props !== null) {
      props.flux.getActions('datalytics').createNewAnalysis(this.state.analysis);
    }
  }

  handleChange(event) {
    const state = {};
    this.state.analysis[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <form className="FormCreateAnalysis">
        <h2>Crea una nuova analisi</h2>
        <mui.TextField
          name="title"
          fullWidth={true}
          onChange={this.handleChange}
          hintText="Titolo analisi" />
        <mui.TextField
          name="keywords"
          fullWidth={true}
          onChange={this.handleChange}
          hintText="Keywords analisi" />
        <mui.RaisedButton onClick={this.handleClick.bind(this)} secondary={true} label="crea analisi" />
      </form>
    );
  }

}

export default FormCreateAnalysis;
