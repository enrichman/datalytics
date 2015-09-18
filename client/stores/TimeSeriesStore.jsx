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
    this.setState({currentTimeSeries: result});
  }

}

export default TimeSeriesStore;
