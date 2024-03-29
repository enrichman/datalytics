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
    config: React.PropTypes.object,
  };

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
    const currentTimeSeries = this.props.currentTimeSeries[this.getIdChart()];
    if (currentTimeSeries) {
      return currentTimeSeries;
    }
    this.props.flux.getActions('timeSeries').getTimeSeries(this.props.query);
    return null;
  }

  render() {
    if (this.props.config && this.getTimeSeries()) {
      const config = this.props.config;
      config.series = this.getTimeSeries();
      return (<Highcharts config={config}/>);
    }
    return null;
  }

}

export default TimeSeriesChart;
