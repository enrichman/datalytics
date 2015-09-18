import { Store } from 'flummox';

class AuthStore extends Store {

  constructor(flux) {
    super();

    const authActions = flux.getActionIds('auth');

    flux.getActions('auth').login();

    this.registerAsync(authActions.login, () => {}, this.handleAttemptToLogin);

    this.state = {
      logged: false,
      user: null,
    };
  }

  handleAttemptToLogin(content) {
    this.setState(content);
  }

}

export default AuthStore;
