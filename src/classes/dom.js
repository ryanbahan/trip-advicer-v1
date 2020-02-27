import $ from 'jquery';
import Authenticator from './authenticator';

class Dom {
  constructor() {

  }

  submitLoginForm() {
    if ($(event.target).hasClass("login-form")) {
      let username = $('#username').val();
      let password = $('#password').val();

      let isValid = Authenticator.validate(username, password);
      let isAdmin = Authenticator.checkAdmin(username);
      console.log('isvalid', isValid);
      console.log('isadmin', isAdmin);
    }
  }

  bindEvents() {
    $('body').on('submit', () => {
      this.submitLoginForm();
    })
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
