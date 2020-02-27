import FetchController from './fetch-controller';

class Authenticator {
  constructor() {}

  static validate(username, password) {
    if (this.validateUsername(username) && this.validatePassword(password)) {
      FetchController.getUser(username);
    }
  }

  static validateUsername(username) {
    let travelerRegex = /agent/;
    let agentRegex = /traveler[0-50]/;

    return travelerRegex.test(username) || agentRegex.test(username);
  }

  static validatePassword(password) {
    let validPassword = 'travel2020';
    let regex = new RegExp(validPassword);

    return regex.test(password);
  }
}

export default Authenticator;
