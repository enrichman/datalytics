import { Store } from 'flummox';

class RouteStore extends Store {

  constructor(flux) {
    super();

    const routeActions = flux.getActionIds('route');
    this.register(routeActions.openPage, this.handleNewPage);

    this.state = {
      currentPage: 'my_analysis',
    };
  }

  handleNewPage(page) {
    this.setState({currentPage: page});
  }

}

export default RouteStore;
