import React from 'react';
import CounterTwitter from '../widgets/CounterTwitter.jsx';
import RadarChartTwitter from '../widgets/RadarChartTwitter.jsx';
import LineChartTwitter from '../widgets/LineChartTwitter.jsx';

class AnalysisDetails extends React.Component {

  static propTypes = {
    params: {
      id: React.PropTypes.object,
    },
    flux: React.PropTypes.object,
    socket: React.PropTypes.object,
    currentAnalysis: React.PropTypes.object,
    buzzCounter: React.PropTypes.number,
    data: React.PropTypes.object,
  };

  static defaultProps = {
    currentAnalysis: null,
    buzzCounter: 0,
    data: {
      labels: ['pizza', 'mandolino', 'pasta'],
      datasets: [
        {
          data: [28, 48, 40],
        },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.props.flux.getActions('datalytics').getOneAnalysis(props.params.id);
    this.stream = props.socket.subscribe(this.props.params.id + ':ping');
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.stream.watch(() => {
        this.setState({buzzCounter: this.state.buzzCounter + 1});
      });
    }
  }

  componentWillUnmount() {
    this.stream.unsubscribe(this.props.params.id + ':ping');
  }

  state = {
    buzzCounter: this.props.buzzCounter,
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentAnalysis.title}</h1>
        <RadarChartTwitter data={this.props.data} />
        <CounterTwitter counter={this.state.buzzCounter} />
        <LineChartTwitter data={this.props.data} />
      </div>
    );
  }

}

export default AnalysisDetails;
