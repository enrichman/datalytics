import { Actions } from 'flummox';
import socketCluster from 'socketcluster-client';

class SocketActions extends Actions {

  openSocketConnection() {
    return socketCluster.connect({port: 3000});
  }

}

export default SocketActions;
