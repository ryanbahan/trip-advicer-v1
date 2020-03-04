import User from './user';

class Traveler extends User {
  constructor(traveler) {
    super(traveler);
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
  }

  getTotalTripCost() {
    let currentTrips = this.trips.filter(trip => trip.date.includes('2020'));

    if (currentTrips.length === 0) {
      return '$0'
    }

    let cost = currentTrips.map(trip => {
      return parseInt(trip.getTripCost(trip.travelers))
    });

    cost = cost.reduce((num, tripCost) => num += tripCost);
    return cost.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
}

export default Traveler;
