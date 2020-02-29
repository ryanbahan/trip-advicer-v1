import './css/base.scss';

import $ from 'jquery';
import Agent from './classes/agent';
import Authenticator from './classes/authenticator';
import Dom from './classes/dom';
import FetchController from './classes/fetch-controller';
import Traveler from './classes/traveler';

let dom = new Dom();
let trips;
let destinations;
let user;

dom.displayLoginForm();

$('body').on('submit', () => {
  let credentials = dom.submitLoginForm();

  let isValid = Authenticator.validate(credentials.username, credentials.password);
  let userRole = Authenticator.checkAdmin(credentials.username);

  if (isValid) {
    dom.hideLoginForm();
    displayDashboard(userRole);
    fetchDashboardData();
  }
})

const displayDashboard = async (userRole) => {
  let htmlString;

  if (userRole === 0) {
    user = new Agent();
    htmlString = dom.displayAdminDashboard();
  } else {
    let fetchedUser = await FetchController.getUser(userRole);

    user = new Traveler(fetchedUser);
    htmlString = await dom.displayTravelerDashboard(user);
  }

  $('body').append(htmlString);
}

const fetchDashboardData = async () => {
  trips = await FetchController.getTrips();
  destinations = await FetchController.getDestinations();
};


$('body').on('click', () => {
  dom.displayTripCard();
  dom.displayBookTripCard();
  console.log(trips);
  console.log(destinations);
})
