import { Actions } from 'flummox';
import $ from 'jquery';

class DatalyticsActions extends Actions {

  getStatus() {
    $.ajax({
      url: '/api/v1/status',
      success: data => { this.logged = data.logged },
      async: false,
    });
    return this.logged;
  }

}

export default DatalyticsActions;
