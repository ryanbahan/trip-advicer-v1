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
    let agentRegex = /agent/;
    let travelerRegex = /^traveler([1-9]|[1-4][0-9]|50)$/;
    console.log(travelerRegex);
    console.log(travelerRegex.test(username));
    return travelerRegex.test(username) || agentRegex.test(username);
  }

  static validatePassword(password) {
    let validPassword = 'travel2020';
    let regex = new RegExp(validPassword);

    return regex.test(password);
  }

  static checkAdmin(username) {
    let agentRegex = /agent/;

    if (agentRegex.test(username)) {
      return true;
    } else {
      return false;
    }
  }
}

export default Authenticator;
