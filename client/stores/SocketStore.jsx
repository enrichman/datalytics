import { Store } from 'flummox';

class SocketStore extends Store  {

  constructor(flux) {
    super();

    const socketAction = flux.getActionIds('socket');

    this.register(socketAction.openSocketConnection,  this.handleSocketConnectionOpening);

    this.state = {
      socket: flux.getActions('socket').openSocketConnection(),
    };
  }

}

export default SocketStore;
