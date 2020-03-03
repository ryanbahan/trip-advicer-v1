class FetchController {
  constructor() {}

  static async getUser(id) {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`);

    let user = await response.json();

    return user;
  }

  static async getAllUsers() {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers`);

    let users = await response.json();

    return users.travelers;
  }

  static async getTrips() {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips`);

    let trips = await response.json();

    return trips.trips;
  }

  static async getDestinations() {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations`);

    let destinations = await response.json();

    return destinations.destinations;
  }

  static async postTrip(trip) {
    let formattedTripData = {...trip};
    delete formattedTripData.destination;
    formattedTripData = JSON.stringify(formattedTripData);

    let response = await fetch(
      "https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formattedTripData
      }
    );
    let retrievedData = await response.json();
  }

  static async approveTrip(tripID) {

    let data = {
      id: tripID,
      status: "approved"
    };

    let formattedTripData = JSON.stringify(data);

    let response = await fetch(
      "https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formattedTripData
      }
    );

    let retrievedData = await response.json();
  }

  static async denyTrip(tripID) {

    let data = {
      id: tripID,
    };

    let formattedTripData = JSON.stringify(data);

    let response = await fetch(
      "https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: formattedTripData
      }
    );

    let retrievedData = await response.json();
  }
}

export default FetchController;
