import React from 'react';
import Highcharts from 'react-highcharts';
import _ from 'lodash';

class TimeSeriesChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.flux.getActions('timeSeries').getTimeSeries({
      key: this.props.idAnalysis,
      granularity: this.props.granularity,
      period: this.props.period,
    });
  }

  render() {
    console.log(this.props.currentTimeSeries);
    const series = this.props.currentTimeSeries;
    const config = {
      title: {
        text: this.props.title,
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Numero di tweet',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      tooltip: {
        valueSuffix: 'tweet',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
      },
      series: series,
    };
    return (<Highcharts config={config}/>);
  }

}

export default TimeSeriesChart;
