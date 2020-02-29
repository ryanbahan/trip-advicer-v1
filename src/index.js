import './css/base.scss';
import $ from 'jquery';

import Authenticator from './classes/authenticator';
import Dom from './classes/dom';

let dom = new Dom();
let user;

$('body').on('submit', () => {
  let credentials = dom.submitLoginForm();

  let isValid = Authenticator.validate(credentials.username, credentials.password);
  let userRole = Authenticator.checkAdmin(credentials.username);

  if (isValid) {
    dom.hideLoginForm();
    dom.displayDashboard(userRole);
  }
})





$('body').on('click', () => {
  dom.displayTripCard();
  dom.displayBookTripCard();
})

dom.displayLoginForm();
