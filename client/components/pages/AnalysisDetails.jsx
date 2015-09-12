import React from 'react';
import { Line, Radar } from 'react-chartjs';
import ReactGridLayout from 'react-grid-layout';

class AnalysisDetails extends React.Component {

  constructor(props) {
    super(props);
    this.props.flux.getActions('datalytics').getOneAnalysis(props.params.id);
    this.state = {
      radar: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
            label: 'My First dataset',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ],
      },
      line: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [65, 30, 80, 81, 56, 55, 40],
          },
        ],
      },
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({date: this.shuffle(this.state.line)});
    }, 1000);
  }

  shuffle(data) {
    const array = data.datasets[0].data;
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    let props;
    if (this.props) {
      props = this.props;
    }

    return (
      <div>
        <h1>{props.currentAnalysis.title}</h1>
        <div style={{width: '50%', float: 'left'}}>
          <Radar data={this.state.line} width="100%" height="250"  />
        </div>
        <div style={{width: '50%', float: 'left'}}>
          <h2 style={{textAlign: 'center', paddingTop: '3em'}}>34<br />tweet pubblicati</h2>
        </div>
        <div style={{width: '100%', float: 'left'}}>
          <Line data={this.state.line} width="100%" height="250"  />
        </div>
      </div>
    );
  }

}

export default AnalysisDetails;
