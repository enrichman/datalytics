import React from 'react';
import { Line } from 'react-chartjs';
import CounterTwitter from '../widgets/CounterTwitter.jsx';
import RadarChartTwitter from '../widgets/RadarChartTwitter.jsx';
import LineChartTwitter from '../widgets/LineChartTwitter.jsx';

class AnalysisDetails extends React.Component {

  static propTypes = {
    params: {
      id: React.PropTypes.object,
    },
    currentAnalysis: React.PropTypes.object,
    buzzCounter: 0,
    data: React.PropTypes.object,
  };

  static defaultProps = {
    params: {
      id: null,
    },
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
  }

  componentDidMount() {
    if (this.props.params.id) {
      const socket = this.props.socket;
      const analysisChannel = socket.subscribe(this.props.params.id + ':ping');
      analysisChannel.watch(() => { this.props.buzzCounter++; });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentAnalysis.title}</h1>
        <RadarChartTwitter data={this.props.data} />
        <CounterTwitter counter={this.props.buzzCounter} />
        <LineChartTwitter data={this.props.data} />
      </div>
    );
  }

}

export default AnalysisDetails;
