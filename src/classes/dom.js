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

  displayAdminDashboard() {
    return `<div>admin!</div>`
  }

  createTripCards(trips, currentDate) {
    return trips.map(trip => {
      let tripStart = moment().format(trip.date);
      let tripEnd = moment(trip.date, 'YYYY/MM/DD').add(10, 'days').format('YYYY/MM/DD');
      let tripDateStatus = this.getDateStatus(tripStart, tripEnd, currentDate);

      let html = `<section class="trip-card" id="${trip.id}" data-date-status="${tripDateStatus}" data-approval-status="${trip.status}">
          <img src="${trip.destination.image}" alt="${trip.destination.alt}">
          <div class="card-bottom">
          <h3>${trip.destination.destination}</h3>
          <p>$${trip.getTripCost()} / person</p>
          <p>${trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</p>
          <p>${tripStart} - ${tripEnd}</p>
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

  displayTripCard() {
    if ($(event.target).hasClass("trip-card")) {
      console.log('trip card');
    }
  }

  displayBookTripCard() {
    if ($(event.target).hasClass("book-trip-card")) {
      console.log('book trip');
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
}

export default Dom;
