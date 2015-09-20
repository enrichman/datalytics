import { Store } from 'flummox';

class TimeSeriesStore extends Store  {

  constructor(flux) {
    super();

    this.flux = flux;

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

  async getTimeSeries(query) {
    return await this.flux.getActions('timeSeries').getTimeSeries(query);
  }

}

export default TimeSeriesStore;
