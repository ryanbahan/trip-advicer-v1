import $ from 'jquery';
let moment = require('moment');

class Dom {
  constructor() {}

  async displayTravelerDashboard(user, date) {
    let userCredentials = 'traveler';
    let topHTML = `<nav><h1 class="traveler-title">TripAdvicer</h1></nav><div class="user-options">
    <div class=options-top><h2>Your Trips</h2><p class="total-spent">Total Expenses: $XX</p></div><hr>
    <div class="options-buttons">
    <button class="all traveler-filter-button">All</button>
    <button class="pending traveler-filter-button">Pending</button>
    <button class="upcoming traveler-filter-button">Upcoming</button>
    <button class="past traveler-filter-button">Past</button></div>
    </div>
    <main>
    <div class="grid-container">
    <section class="book-trip-card">
    <h3>Book a new trip!</h3>
    </section>`

    let cards = this.createTripCards(user.trips, date, userCredentials).join('');

    let bottomHTML = `</div></main>`;

    return `${topHTML}${cards}${bottomHTML}`;
  }

  displayAdminDashboard(allUsers, trips, date) {
    let userCredentials = 'admin'
    let topHTML =  `<div class="admin-container">
    <aside class="admin-nav">
    <h1>TripAdvicer</h1>
    <ul class="admin-nav-list">
    <li class="pending-admin-filter-li">Pending Trips</li>
    <li class="current-admin-filter-li">Current Trips</li>
    <li class="upcoming-admin-filter-li">Upcoming Trips</li>
    <li class="past-admin-filter-li">Past Trips</li>
    <li class="revenue-admin-filter-li">Revenue</li>
    </ul>
    </aside>
    <main>
    <div class="grid-container">`

    trips = trips.filter(trip => trip.destination !== undefined);

    let middleHTML = this.displayPendingView(trips, date, userCredentials).join('');

    let bottomHTML = `</div></main></div>`;

    return `${topHTML}${middleHTML}${bottomHTML}`;
  }

  clearTripCards() {
    $('.grid-container').empty();
  }

  displayRevenueView() {
    console.log('revenue');
  }

  displayPendingView(trips, date, userCredentials) {
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-approval-status="pending"'));
  }

  displayUpcomingView(trips, date, userCredentials) {
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-date-status="upcoming"'));
  }

  displayPastView(trips, date, userCredentials) {
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-date-status="past"'));
  }

  displayCurrentView(trips, date, userCredentials) {
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-date-status="current"'));
  }

  createTripCards(trips, currentDate, userRole) {
    return trips.map(trip => {
      let tripStart = moment().format(trip.date);
      let tripEnd = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');
      let tripDateStatus = this.getDateStatus(tripStart, tripEnd, currentDate);

      let html = `<section class="${userRole} trip-card" id="${trip.id}" data-date-status="${tripDateStatus}" data-approval-status="${trip.status}">
          <img src="${trip.destination.image}" alt="${trip.destination.alt}" class="card-image">
          <div class="card-bottom">
          <div class="top-row">
          <h3 class="trip-title">${trip.destination.destination}</h3>
          <p class="trip-status">${trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</p>
          </div>
          <div class="bottom-row">
          <p class="trip-duration">${tripStart} - ${tripEnd}</p>
          <p class="trip-cost">$${trip.getTripCost(trip.travelers)}</p>
          </div>
          </div>
          </section>`;

      return html;
    })
  }

  getDateStatus(tripStart, tripEnd, currentDate) {
    if (moment(tripEnd, 'YYYY/MM/DD').isBefore(currentDate, 'YYYY/MM/DD')) {
      return 'past';
    } else if (moment(tripStart, 'YYYY/MM/DD').isAfter(currentDate, 'YYYY/MM/DD')) {
      return 'upcoming';
    } else {
      return 'current';
    }
  }

  hideLoginForm() {
    $('.form-container').remove();
  }

  submitLoginForm() {
    if ($(event.target).hasClass("login-form")) {
      let username = $('#username').val();
      let password = $('#password').val();

      return {username: username, password: password};
    }
  }

  displayLoginForm() {
    $('body').append(`<div class="form-container">
          <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 login-form">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
              </div>
              <div class="flex items-center justify-between pointer-events-auto">
                <button class="login-form-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline pointer-events-auto" type="submit">
                  Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a>
              </div>
            </form>
            <p class="text-center text-gray-500 text-xs">
              &copy;2020 TripAdvicer. All rights reserved.
            </p>
          </div>
        </div>`)
  }

  filterTravelerCards(cardLabel) {
      $('main').find(`section.trip-card`).removeClass('hidden');

      if (cardLabel === 'all') {

      } else if (cardLabel === 'pending') {
        $('section.trip-card').not(`[data-approval-status='${cardLabel}']`).addClass('hidden');
      } else {
        $('section.trip-card').not(`[data-date-status='${cardLabel}']`).addClass('hidden');
      }
  }

  displayTripCard(trip) {
    console.log(trip);
    let individualCost = trip.getIndividualCost(trip.travelers);
    let durationNumber = trip.duration;
    let travelers = trip.travelers;
    let title = $(event.target).find('.trip-title').html();
    let status = $(event.target).find('.trip-status').html();
    let totalCost = $(event.target).find('.trip-cost').html();
    let commission = (parseInt(trip.getTripCost(trip.travelers)) * 0.1).toFixed();
    let duration = $(event.target).find('.trip-duration').html();
    let card = $(event.target).children();
    let image = $(event.target).find('img').attr('src');
    let imageAlt = $(event.target).find('img').attr('alt');

    $('body').append(`<div class="modal-opacity">
    <section class="trip-modal">
    <img src ="${image}" alt = "${imageAlt}" class="modal-image">
    <div class="modal-bottom">
    <h3 class="modal-title">${title}</h3>
    <p class="trip-status">Status: ${status}</p>
    <p class="modal-trip-cost">Commission: $${commission}</p>
    <p class="modal-trip-cost">Total cost: ${totalCost}</p>
    <p class="modal-trip-cost">Cost per person: $${individualCost}</p>
    <p class="modal-trip-duration">Duration: ${durationNumber} days</p>
    <p class="modal-trip-duration">Dates: ${duration}</p>
    <p class="modal-trip-duration">Party size: ${travelers}</p>
    </div>
    <div class="close-container">
    <p class="modal-close">Close</p>
    </div>
    </section>
    </div>`)
  }

  displayBookTripCard() {
    $('body').append(`<div class="modal-opacity">
    <section class="trip-modal">
    <img src ="" alt = "">
    <h3>test</h3>
    <p class="trip-cost">test</p>
    <p class="trip-status">test</p>
    <p class="trip-duration">test</p>
    <p class="modal-close">Close</p>
    </section>
    </div>`)
  }

  closeModal() {
    $('body').find('.modal-opacity').remove();
  }
}

export default Dom;
