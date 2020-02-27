class Authenticator {
  constructor() {
    this.password = 'travel2020';
  }

  static validate(username, password) {
    this.validateUsername(username);
    return this.validateUsername(username);
  }

  static validateUsername(username) {
    let regex = /traveler[0-50]/;
    let match = name.match(regex);

    return regex.test(username);
  }
}
export default Authenticator;
