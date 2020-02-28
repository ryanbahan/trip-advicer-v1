class FetchController {
  constructor() {}

  static async getUser(id) {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`);

    let user = await response.json();

    return user;
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
}

export default FetchController;
