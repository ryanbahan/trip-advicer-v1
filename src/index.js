import './css/base.scss';
import $ from 'jquery';
import Agent from './classes/agent';
import Authenticator from './classes/authenticator';
import Dom from './classes/dom';
import FetchController from './classes/fetch-controller';
import Traveler from './classes/traveler';
import Trip from './classes/trip';

let dom = new Dom();
let moment = require('moment');
let trips;
let destinations;
let user;
let allUsers;
let currentDate = moment().format('YYYY/MM/DD');

const displayDashboard = async (userRole) => {
  let htmlString;

  if (userRole === 0) {
    allUsers = await FetchController.getAllUsers();
    user = new Agent();
    htmlString = dom.displayAdminDashboard(allUsers, trips, currentDate);
  } else {
    let fetchedUser = await FetchController.getUser(userRole);

    user = new Traveler(fetchedUser);
    user.trips = trips.filter(trip => trip.userID === user.id);
    htmlString = await dom.displayTravelerDashboard(user, currentDate);
  }

  $('body').append(htmlString);
}

const fetchDashboardData = async () => {
  let tripData = await FetchController.getTrips();
  let destinationData = await FetchController.getDestinations();

  trips = tripData.map(trip => new Trip(trip, destinationData));
  destinations = destinationData;
};

// Login form
$('body').on('submit', () => {
  let credentials = dom.submitLoginForm();

  let isValid = Authenticator.validate(credentials.username, credentials.password);
  let userRole = Authenticator.checkAdmin(credentials.username);

  if (isValid) {
    dom.hideLoginForm();
    displayDashboard(userRole);
  }
})

// User view
$('body').on('click', () => {

  if ($(event.target).hasClass('trip-card')) {
    dom.displayTripCard();
  }

  if ($(event.target).hasClass('book-trip-card')) {
    dom.displayBookTripCard();
  }

  if ($(event.target).hasClass('traveler-filter-button')) {
    dom.filterTravelerCards(event.target.classList[0]);
  }

  if ($(event.target).hasClass('modal-close')) {
    dom.closeModal();
  }

})

//Admin view

$('body').on('click', () => {

  if ($(event.target).hasClass('revenue-admin-filter-li')) {
    dom.displayRevenueView();
  }

  if ($(event.target).hasClass('pending-admin-filter-li')) {
    dom.displayPendingView();
  }

  if ($(event.target).hasClass('upcoming-admin-filter-li')) {
    dom.displayUpcomingView();
  }

  if ($(event.target).hasClass('past-admin-filter-li')) {
    dom.displayPastView();
  }

})

fetchDashboardData();
dom.displayLoginForm();
