import $ from 'jquery';

$(document).ready(() => {
  $.ajax({
    url: 'http://datalytics.dev:3000/api/v1/analysis',
  }).done(data => {
    console.log(data);
  });
});
