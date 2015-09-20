import React from 'react';
import Highcharts from 'react-highcharts';
import moment from 'moment';

class ChartVolumeLastHourContainer extends React.Component {

  constructor() {
    super();
    this.state = { series: [] };
  }

  componentDidMount() {
    this.props.flux.getStore('timeSeries').getTimeSeries({
      analysis: 'timeseries',
      key: this.props.id,
      type: 'area',
      granularity: '1minute',
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
        text: 'Ultima ora',
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
        gridLineColor: 'transparent',
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
      plotOptions: {
        area: {
          marker: {
            enabled: false,
          },
        },
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

export default ChartVolumeLastHourContainer;
