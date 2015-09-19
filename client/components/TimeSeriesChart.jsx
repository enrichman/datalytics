import React from 'react';
import Highcharts from 'react-highcharts';
import _ from 'lodash';
import moment from 'moment';
import md5 from 'md5';

class TimeSeriesChart extends React.Component {

  static propTypes = {
    flux: React.PropTypes.object,
    query: React.PropTypes.object,
    currentTimeSeries: React.PropTypes.array,
  };

  static defaultProps = {
    _config: {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Title of chart',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          rotation: -45,
          formatter: function() {
            return moment(this.value * 1000).format('HH:mm');
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        borderWidth: 0,
      },
      series: [],
    },
  }

    constructor(props) {
      super(props);
    }

  componentWillMount() {
    this.props.flux.getActions('timeSeries').getTimeSeries(this.props.query);
  }

  getIdChart() {
    return md5(JSON.stringify(this.props.query));
  }

  getTimeSeries() {
    return this.props.currentTimeSeries[this.getIdChart()];
  }

  render() {
    const series = this.getTimeSeries();
    const config = _.merge(this.props._config, this.props.config);
    config.series = this.getTimeSeries();
    return (<Highcharts config={config}/>);
  }

}

export default TimeSeriesChart;
