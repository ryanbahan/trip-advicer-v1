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

  static async postTrip(trip, user) {
    let id = Date.now() - Math.floor(Math.random() * Math.floor(1000));

    let formattedTripData = {
      "id": id,
      "userID": user.id,
      "destinationID": trip.destination,
      "travelers": trip.travelers,
      "date": trip.startDate,
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
    }
    console.log(formattedTripData);
  }
}

export default FetchController;
