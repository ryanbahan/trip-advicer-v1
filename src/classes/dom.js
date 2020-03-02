import $ from 'jquery';
import datepicker from 'js-datepicker';
let moment = require('moment');

class Dom {
  constructor() {}

  async displayTravelerDashboard(user, date) {
    let totalSpent = user.getTotalTripCost();
    let userCredentials = 'traveler';
    let topHTML = `<nav><h1 class="traveler-title">TripAdvicer</h1></nav><div class="user-options">
    <div class=options-top><h2>Your Trips</h2><p class="total-spent">Total Expenses: ${totalSpent}</p></div><hr>
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
    trips = trips.filter(trip => trip.destination !== undefined);
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-approval-status="pending"'));
  }

  displayUpcomingView(trips, date, userCredentials) {
    trips = trips.filter(trip => trip.destination !== undefined);
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-date-status="upcoming"'));
  }

  displayPastView(trips, date, userCredentials) {
    trips = trips.filter(trip => trip.destination !== undefined);
    return this.createTripCards(trips, date, userCredentials).filter(card => card.includes('data-date-status="past"'));
  }

  displayCurrentView(trips, date, userCredentials) {
    trips = trips.filter(trip => trip.destination !== undefined);
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
    console.log('traveler');
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

  displayAdminTripCard(trip) {
    console.log('admin');
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
    <section class="book-trip-modal">
    <div class="form-close-container">
    <p class="modal-close">Close</p>
    </div>
    <h3>Make your next trip unforgettable.</h3>
    <form>
    <label for="destination">Destination</label>
    <input type="text" class="destination-input" id="destination" list="places-output" required>
    <datalist id="places-output">
    <option value="Lima, Peru">
    </option><option value="Stockholm, Sweden">
    </option><option value="Sydney, Austrailia">
    </option><option value="Cartagena, Colombia">
    </option><option value="Madrid, Spain">
    </option><option value="Jakarta, Indonesia">
    </option><option value="Paris, France">
    </option><option value="Tokyo, Japan">
    </option><option value="Amsterdam, Netherlands">
    </option><option value="Toronto, Canada">
    </option><option value="Mikonos, Greece">
    </option><option value="Wellington, New Zealand">
    </option><option value="St. Petersburg, Russia">
    </option><option value="Marrakesh, Morocco">
    </option><option value="Manila, Philippines">
    </option><option value="Bangkok, Thailand">
    </option><option value="Jaipur, India">
    </option><option value="Cape Town, South Africa">
    </option><option value="Quito, Ecuador">
    </option><option value="Miami, Florida">
    </option><option value="Tulum, Mexico">
    </option><option value="Rome, Italy">
    </option><option value="Copenhagen, Denmark">
    </option><option value="Vilnius, Lithuania">
    </option><option value="New York, New York">
    </option><option value="London, England">
    </option><option value="San Francisco, California">
    </option><option value="San Juan, Puerto Rico">
    </option><option value="Willemstad, Curaçao">
    </option><option value="Antananarivo, Madagascar">
    </option><option value="Colombo, Sri Lanka">
    </option><option value="Kathmandu, Nepal">
    </option><option value="Brussels, Belgium">
    </option><option value="Seoul, South Korea">
    </option><option value="Anchorage, Alaska">
    </option><option value="Reykjavík, Iceland">
    </option><option value="Frankfurt, Germany">
    </option><option value="Helsinki, Finland">
    </option><option value="Porto, Portugal">
    </option><option value="La Isla Tortuga, Costa Rica">
    </option><option value="Montego Bay, Jamaica">
    </option><option value="Santo Domingo, Dominican Republic">
    </option><option value="Nassau, The Bahamas">
    </option><option value="Caye Caulker, Belize">
    </option><option value="Calgary, Canada">
    </option><option value="Hobart, Tasmania">
    </option><option value="Victoria, Seychelles">
    </option><option value="Zürich, Switzerland">
    </option><option value="Dar es Salaam, Tanzania">
    </option><option value="Castries, St Lucia">
    </option></datalist>
    </datalist>
    <div class="form-row">
    <div class="date-container">
    <label for="date-start">Depart</label>
    <input type="text" class="start" id ="datepicker1" required>
    </div>
    <div class="date-container">
    <label for="date-end">Return</label>
    <input type="text" class="end" id ="datepicker2" required>
    </div>
    </div>
    <label for="guests">Guests</label>
    <input type="number" class="number-guests" id="guests" required>
    <button type="submit" class="book-form-submit">Submit</button>
    </form>
    </section>
    </div>`);
  }

  closeModal() {
    $('body').find('.modal-opacity').remove();
  }

  displayFormDestinations(destinations) {

  let query = $('.destination-input').val();
  const placesOutput = $('#places-output');

  let matches = destinations.filter(destination => {
  const regex = new RegExp(`${query}`, 'gi');
  return destination.destination.match(regex);
  });

  const outputHtml = matches => {
      const html = matches.map(match => `
        <option value="${match.destination}">
        `).join('');

        placesOutput.empty();
        placesOutput.append(html);
  }

  outputHtml(matches);

  }

  submitBookTripForm() {
    let destination = $("form").find('.destination-input').val();
    let startDate = $("form").find('.start').val();
    let endDate = $("form").find('.end').val();
    let travelers = $("form").find('.number-guests').val();
    let duration;

    startDate = moment(startDate).format('YYYY/MM/DD');
    endDate = moment(endDate).format('YYYY/MM/DD');

    var durationA = moment(startDate);
    var durationB = moment(endDate);
    duration = durationB.diff(durationA, 'days');

    return {
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      travelers: travelers,
      duration: duration
    }
  }

  displayTripConfirmation(tripData, trips) {
    $('.book-trip-modal').empty();
    $('.book-trip-modal').append(`
      <div class="form-close-container">
      <p class="modal-close">Close</p>
      </div>
      <h3>You're almost there.</h3>
      <img src="${tripData.destination.image}" alt="${tripData.destination.alt}" class="confirm-trip-image">
      <h3>${tripData.destination.destination}</h3>
      <div class="form-row">
      <p>Total Cost: $${tripData.getTripCost(tripData.travelers)}</p>
      <p>Travelers: ${tripData.travelers}</p>
      <p>Cost per person: $${tripData.getIndividualCost(tripData.travelers)}</p>
      </div>
      <button type="submit" class="destination-confirmation-submit">Confirm Trip</button>
      `)
  }
}

export default Dom;
