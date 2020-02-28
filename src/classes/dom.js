import $ from 'jquery';
import Authenticator from './authenticator';
import Dashboard from './dashboard';
import FetchController from './fetch-controller';

class Dom {
  constructor() {
    this.dashboard = null
  }

  async displayDashboard(userRole) {
    let dashboard = new Dashboard();
    let htmlString;

    if (userRole === 0) {
      htmlString = dashboard.displayAdminDashboard();
    } else {
      let user = await FetchController.getUser(userRole);
      htmlString = await dashboard.displayTravelerDashboard(user);
    }

    this.dashboard = dashboard;
    $('body').append(htmlString);
  }

  hideLoginForm() {
    $('.form-container').remove();
  }

  submitLoginForm() {
    if ($(event.target).hasClass("login-form")) {
      let username = $('#username').val();
      let password = $('#password').val();

      let isValid = Authenticator.validate(username, password);
      let userRole = Authenticator.checkAdmin(username);

      if (isValid) {
        this.hideLoginForm();
        this.displayDashboard(userRole);
      }
    }
  }

  bindEvents() {
    $('body').on('submit', () => {
      this.submitLoginForm();
    })
    $('body').on('click', () => {
      this.displayTripCard();
      this.displayBookTripCard();
    })
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
}

export default Dom;
