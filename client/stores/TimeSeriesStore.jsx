import { Store } from 'flummox';

class TimeSeriesStore extends Store  {

  constructor(flux) {
    super();

    this.timeSeriesAction = flux.getActionIds('timeSeries');

    this.register(this.timeSeriesAction.getTimeSeries, this.handleNewTimeSeries);

    this.state = {
      currentTimeSeries: [],
    };
  }

  handleNewTimeSeries(result) {
    const currentTimeSeries = this.state.currentTimeSeries;
    currentTimeSeries[result.key] = result.data;
    this.setState({currentTimeSeries: currentTimeSeries});
  }

}

export default TimeSeriesStore;
