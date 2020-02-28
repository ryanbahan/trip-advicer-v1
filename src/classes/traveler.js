import FetchController from './fetch-controller'

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.trips = []
  }

  async getTrips() {
    let allTrips = await FetchController.getTrips();
    this.trips = allTrips.filter(trip => trip.userID === this.id);
    console.log(await FetchController.getDestinations());
    return this.trips;
  }
}

export default Traveler;
