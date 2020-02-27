import FetchController from './fetch-controller';

class Authenticator {
  constructor() {}

  static validate(username, password) {
    if (this.validateUsername(username) && this.validatePassword(password)) {
      return true;
    } else {
      return false;
    }
  }

  static validateUsername(username) {
    let agentRegex = /^agent$/;
    let travelerRegex = /^traveler([1-9]|[1-4][0-9]|50)$/;

    return travelerRegex.test(username) || agentRegex.test(username);
  }

  static validatePassword(password) {
    let regex = /^travel2020$/;

    return regex.test(password);
  }

  static checkAdmin(username) {
    let agentRegex = /^agent$/;
    let travelerRegex = /^traveler([1-9]|[1-4][0-9]|50)$/;

    if (agentRegex.test(username)) {
      return 'admin';
    } else if (travelerRegex.test(username)) {
      return 'traveler';
    } else {
      return false;
    }
  }
}

export default Authenticator;
