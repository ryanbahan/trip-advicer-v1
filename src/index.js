import './css/base.scss';

import $ from 'jquery';
import Agent from './classes/agent';
import Authenticator from './classes/authenticator';
import Dom from './classes/dom';
import FetchController from './classes/fetch-controller';
import Traveler from './classes/traveler';
import Trip from './classes/trip';

let dom = new Dom();
let trips;
let destinations;
let user;
let allUsers;

dom.displayLoginForm();

$('body').on('submit', () => {
  let credentials = dom.submitLoginForm();

  let isValid = Authenticator.validate(credentials.username, credentials.password);
  let userRole = Authenticator.checkAdmin(credentials.username);

  if (isValid) {
    dom.hideLoginForm();
    fetchDashboardData();
    displayDashboard(userRole);
  }
})

const displayDashboard = async (userRole) => {
  let htmlString;

  if (userRole === 0) {
    allUsers = await FetchController.getAllUsers();
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
  let tripData = await FetchController.getTrips();
  let destinationData = await FetchController.getDestinations();

  trips = tripData.map(trip => new Trip(trip, destinationData));
  destinations = destinationData;
};


$('body').on('click', () => {
  dom.displayTripCard();
  dom.displayBookTripCard();
  // console.log(allUsers);
  // console.log(trips);
  // console.log(destinations);
})
