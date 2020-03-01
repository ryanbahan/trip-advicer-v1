import $ from 'jquery';
let moment = require('moment');

class Dom {
  constructor() {}

  async displayTravelerDashboard(user, date) {
    let topHTML = `<nav><h1>TripAdvicer</h1></nav><div class="user-options">
    <div class=options-top><h2>Your Trips</h2><p class="total-spent">Total Expenses: $XX</p></div><hr>
    <div class="options-buttons">
    <button class="all traveler-filter-button">All</button>
    <button class="pending traveler-filter-button">Pending</button>
    <button class="upcoming traveler-filter-button">Upcoming</button>
    <button class="past traveler-filter-button">Past</button></div>
    </div>
    <main id="grid-content">
    <section class="book-trip-card">
    <h3>Book a new trip!</h3>
    </section>`

    let cards = this.createTripCards(user.trips, date).join('');

    let bottomHTML = `</main>`;

    return `${topHTML}${cards}${bottomHTML}`;
  }

  displayAdminDashboard(allUsers, trips, date) {
    let topHTML =  `<div class="admin-container">
    <aside class="admin-nav">
    <h1>TripAdvicer</h1>
    <ul class="admin-nav-list">
    <li class="revenue-admin-filter-li">Revenue Dashboard</li>
    <li class="pending-admin-filter-li">Pending Trips</li>
    <li class="current-admin-filter-li">Current Trips</li>
    <li class="upcoming-admin-filter-li">Upcoming Trips</li>
    <li class="past-admin-filter-li">Past Trips</li>
    </ul>
    </aside>
    <main>`

    let middleHTML = this.displayPendingView(trips, date).join('');

    let bottomHTML = `</main></div>`;

    return `${topHTML}${middleHTML}${bottomHTML}`;
  }

  displayRevenueView() {
    console.log('revenue');
  }

  displayPendingView(trips, date) {
    return this.createTripCards(trips, date);
  }

  displayUpcomingView() {
    console.log('upcoming');
  }

  displayPastView() {
    console.log('past');
  }

  createTripCards(trips, currentDate) {
    return trips.map(trip => {
      let tripStart = moment().format(trip.date);
      let tripEnd = moment(trip.date, 'YYYY/MM/DD').add(10, 'days').format('YYYY/MM/DD');
      let tripDateStatus = this.getDateStatus(tripStart, tripEnd, currentDate);

      let html = `<section class="trip-card" id="${trip.id}" data-date-status="${tripDateStatus}" data-approval-status="${trip.status}">
          <img src="${trip.destination.image}" alt="${trip.destination.alt}" class="card-image">
          <div class="card-bottom">
          <h3 class="trip-title">${trip.destination.destination}</h3>
          <p class="trip-cost">$${trip.getTripCost()} / person</p>
          <p class="trip-status">${trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</p>
          <p class="trip-duration">${tripStart} - ${tripEnd}</p>
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

  displayTripCard() {
    let title = $(event.target).find('.trip-title').html();
    let status = $(event.target).find('.trip-status').html();
    let cost = $(event.target).find('.trip-cost').html();
    let duration = $(event.target).find('.trip-duration').html();
    let card = $(event.target).children();
    let image = $(event.target).find('img').attr('src');
    let imageAlt = $(event.target).find('img').attr('alt');

    $('body').append(`<div class="modal-opacity">
    <section class="trip-modal">
    <img src ="${image}" alt = "${imageAlt}">
    <h3>${title}</h3>
    <p class="trip-cost">${cost}</p>
    <p class="trip-status">${status}</p>
    <p class="trip-duration">${duration}</p>
    <p class="modal-close">Close</p>
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
