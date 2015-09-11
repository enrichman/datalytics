import { Store } from 'flummox';
import RouteParser from 'route-parser';

class RouteStore extends Store {

  constructor(flux) {
    super();

    const routeActions = flux.getActionIds('route');
    this.register(routeActions.openPage, this.handleNewRequest);

    const pathname = window.location.pathname;
    const route = new RouteParser(pathname);
    this.state = {
      location: {
        pathname: pathname,
        params: route.match('*'),
      },
    };
  }

  handleNewRequest(path) {
    this.setState({ location: {pathname: path}});
  }

}

export default RouteStore;
