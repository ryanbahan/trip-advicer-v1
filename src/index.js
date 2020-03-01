import './css/base.scss';
import $ from 'jquery';
import datepicker from 'js-datepicker';
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
let userCredentials;
let allUsers;
let currentDate = moment().format('YYYY/MM/DD');
let datepickerStart;
let datepickerEnd;

const displayDashboard = async (userRole) => {
  let htmlString;

  if (userRole === 0) {
    allUsers = await FetchController.getAllUsers();
    user = new Agent();
    userCredentials = 'admin';
    htmlString = dom.displayAdminDashboard(allUsers, trips, currentDate);
  } else {
    let fetchedUser = await FetchController.getUser(userRole);

    userCredentials = 'traveler';
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

const addDatepicker = () => {
  let id = Date.now()
  let datepickerStart = datepicker('.start', { id: id });
  let datepickerEnd = datepicker('.end', { id: id });
}

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

  if ($(event.target).hasClass('book-form-submit')) {
    event.preventDefault();
  }

  if ($(event.target).hasClass('trip-card') &&
      $(event.target).hasClass('traveler')) {
        let trip = trips.find(trip => trip.id === parseInt(event.target.id))
        dom.displayTripCard(trip);
  }

  if ($(event.target).hasClass('book-trip-card')) {
    dom.displayBookTripCard();
    addDatepicker();
  }

  if ($(event.target).hasClass('traveler-filter-button')) {
    dom.filterTravelerCards(event.target.classList[0]);
  }

})

//Admin view

$('body').on('click', () => {

  if ($(event.target).hasClass('trip-card') &&
      $(event.target).hasClass('admin')) {
        let trip = trips.find(trip => trip.id === parseInt(event.target.id))
        dom.displayAdminTripCard(trip);
  }

  if ($(event.target).hasClass('revenue-admin-filter-li')) {
    dom.clearTripCards();
    let htmlString = dom.displayRevenueView();
    $('.grid-container').append(htmlString);
  }

  if ($(event.target).hasClass('pending-admin-filter-li')) {
    dom.clearTripCards();
    let htmlString = dom.displayPendingView(trips, currentDate, userCredentials);
    $('.grid-container').append(htmlString);
  }

  if ($(event.target).hasClass('upcoming-admin-filter-li')) {
    dom.clearTripCards();
    let htmlString = dom.displayUpcomingView(trips, currentDate, userCredentials);
    $('.grid-container').append(htmlString);
  }

  if ($(event.target).hasClass('current-admin-filter-li')) {
    dom.clearTripCards();
    let htmlString = dom.displayCurrentView(trips, currentDate, userCredentials);
    $('.grid-container').append(htmlString);
  }

  if ($(event.target).hasClass('past-admin-filter-li')) {
    dom.clearTripCards();
    let htmlString = dom.displayPastView(trips, currentDate, userCredentials);
    $('.grid-container').append(htmlString);
  }

})

//Shared admin/user functionality
$('body').on('click', () => {

  if ($(event.target).hasClass('modal-close')) {
    dom.closeModal();
  }

})

fetchDashboardData();
dom.displayLoginForm();
