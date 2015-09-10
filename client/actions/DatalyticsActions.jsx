import { Actions } from 'flummox';
import $ from 'jquery';

class DatalyticsActions extends Actions {

  getStatus() {
    $.ajax({
      url: '/api/v1/status',
      success: data => { this.data = data },
      async: false,
    });
    return this.data;
  }

  openPage(page) {
    return page;
  }

}

export default DatalyticsActions;
