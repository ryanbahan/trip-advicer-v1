import './css/base.scss';
import './images/turing-logo.png'
import Dom from './classes/dom';
import $ from 'jquery';

let dom = new Dom();
let user;
let userRole;

$('body').on('submit', () => {
  userRole = dom.submitLoginForm();
  dom.hideLoginForm();
  dom.displayDashboard(userRole);
})

$('body').on('click', () => {
  dom.displayTripCard();
  dom.displayBookTripCard();
})

dom.displayLoginForm();
