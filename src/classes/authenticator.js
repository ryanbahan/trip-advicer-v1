let moment = require('moment');

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
      return 0;
    } else if (travelerRegex.test(username)) {
      let regex = /\d+/;
      let userID = parseInt(username.match(regex)[0]);

      return userID;
    } else {
      return false;
    }
  }

  static validateDestinationForm(formSubmissionData, destinations) {
    let validDates = this.checkFormDates(formSubmissionData.startDate, formSubmissionData.endDate);
    let validDestination = destinations.find(destination =>
      destination.destination.includes(formSubmissionData.destination));
    let validGroupNumber = parseInt(formSubmissionData.travelers);


    if (validDates && validDestination && validGroupNumber) {
      formSubmissionData.destination = validDestination.id;
      return formSubmissionData;
    } else {
      return false;
    }
  }

  static checkFormDates(start, end) {
    if (moment(start).isBefore(end)) {
      return true;
    }
  }
}

export default Authenticator;
