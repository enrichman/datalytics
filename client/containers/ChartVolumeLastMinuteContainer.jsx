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

    this.props.flux.getStore('analysis').getAnalysis(this.props.id).then(analysis => {
    });
  }

  render() {
    const config = {
      chart: {
        type: 'area',
        /*events: {
          load: function () {
            this.series.forEach(serie => {
              setInterval(function () {
                var x = (new Date()).getTime(), // current time
                  y = Math.random();
                serie.removePoint(0, true, true);
                serie.addPoint([x/1000, y*10], true, true);
              }, 1000);
            });
          },
        },*/
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
        tickPixelInterval: 150,
      },
      yAxis: {
        gridLineColor: 'transparent',
        title: {
          text: 'Numero di tweet',
        },
        plotLines: [{
          marker: {
            enabled: false,
          },
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

export default ChartVolumeLastMinuteContainer;
