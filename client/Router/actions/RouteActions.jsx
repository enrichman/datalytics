import { Actions } from 'flummox';

class RouteActions extends Actions {

  openPage(href) {
    history.pushState({}, null, href);
    return href;
  }

}

export default RouteActions;
