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
    let regex = /traveler[0-50]/;

    return regex.test(username);
  }

  static validatePassword(password) {
    let validPassword = 'travel2020';
    let regex = new RegExp(validPassword);

    return regex.test(password);
  }
}

export default Authenticator;
