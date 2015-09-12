import { Store } from 'flummox';

class RouteStore extends Store {

  constructor(flux) {
    super();

    const routeActions = flux.getActionIds('route');
    this.register(routeActions.openPage, this.handleNewRequest);

    const pathname = window.location.pathname;
    this.state = {
      pathname: pathname,
    };
  }

  handleNewRequest(href) {
    this.setState({pathname: href});
  }

}

export default RouteStore;
