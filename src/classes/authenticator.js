class Authenticator {
  constructor() {

  }

  static validate(username, password) {
    return `${username} ${password}`
  }
}
export default Authenticator;
