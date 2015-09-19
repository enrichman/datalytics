import React from 'react';
import Highcharts from 'react-highcharts';
import _ from 'lodash';
import moment from 'moment';

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
    const format = this.props.format;
    const series = this.props.currentTimeSeries;
    const config = {
      title: {
        text: this.props.title,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          rotation: -45,
          formatter: function() {
            return moment(this.value*1000).format(format);
          },
        },
      },
      yAxis: {
        title: {
          text: 'Numero di tweet',
        },
        plotLines: [{
          value: 0,
          width: 0,
          color: '#808080',
        }],
      },
      tooltip: {
        valueSuffix: 'tweet',
      },
      legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0,
      },
      series: series,
    };
    return (<Highcharts config={config}/>);
  }

}

export default TimeSeriesChart;
