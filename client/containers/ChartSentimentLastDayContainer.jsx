import React from 'react';
import Highcharts from 'react-highcharts';

class ChartSentimentLastDayContainer extends React.Component {

  constructor() {
    super();
    this.state = { series: [] };
  }

  componentDidMount() {
    this.props.flux.getStore('timeSeries').getTimeSeries({
      analysis: 'sentiment',
      key: this.props.id,
      type: 'area',
      granularity: '1day',
      period: 1,
    }).then(result => {
      this.setState({series: result.data});
    });
  }

  render() {
    const config = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'Sentiment analysis / volume di oggi',
      },
      yAxis: {
        title: {
          text: 'Sentiment',
        },
      },
      plotOptions: {
        scatter: {
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} tweet, {point.y} sentiment',
          },
        },
      },
      series: this.state.series,
    };
    return (<Highcharts config={config}/>);
  }

}

export default ChartSentimentLastDayContainer;
