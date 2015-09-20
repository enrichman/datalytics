import React from 'react';
import Highcharts from 'react-highcharts';
import moment from 'moment';

class ChartVolumeLastMinuteContainer extends React.Component {

  constructor() {
    super();
    this.state = { series: [] };
  }

  componentDidMount() {
    this.props.flux.getStore('timeSeries').getTimeSeries({
      analysis: 'timeseries',
      key: this.props.id,
      type: 'area',
      granularity: '1second',
      period: 60,
    }).then(result => {
      this.setState({series: result.data});
    });
  }

  render() {
    const config = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Ultimo minuto',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        labels: {
          rotation: -45,
          formatter: function() {
            return moment(this.value * 1000).format('HH:mm:ss');
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
      series: this.state.series,
    };

    return (<Highcharts config={config}/>);
  }

}

export default ChartVolumeLastMinuteContainer;
