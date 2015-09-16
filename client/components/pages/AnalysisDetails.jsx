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
    currentTimeSeries: React.PropTypes.object,
    comments: React.PropTypes.number,
    reach: React.PropTypes.number,
    data: React.PropTypes.object,
  };

  static defaultProps = {
    currentAnalysis: null,
    comments: 0,
    reach: 0,
    timeSeries: {
      labels: ['ciao', 'mandolino', 'pasta'],
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
    this.props.flux.getActions('datalytics').getTimeSeries({key: 'keyword/apple', granularity: '1second', period: 120});
    this.stream = props.socket.subscribe(this.props.params.id + ':ping');
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.stream.watch(ping => {
        this.setState({
          comments: this.state.comments + ping.comment,
          reach: this.state.reach + ping.reached,
        });
      });
    }
  }

  componentWillUnmount() {
    this.stream.unsubscribe(this.props.params.id + ':ping');
  }

  state = {
    comments: this.props.comments,
    reach: this.props.reach,
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentAnalysis.title}</h1>
        <CounterTwitter background="#9ab459" message="commenti" counter={this.props.currentAnalysis.comments + this.state.comments} />
        <CounterTwitter background="#57947f" message="utenti raggiunti" counter={this.props.currentAnalysis.reach + this.state.reach} />
        <RadarChartTwitter data={this.props.timeSeries} />
        <RadarChartTwitter data={this.props.timeSeries} />
        <LineChartTwitter data={this.props.timeSeries} />
      </div>
    );
  }

}

export default AnalysisDetails;
