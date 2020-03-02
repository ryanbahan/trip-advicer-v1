class Agent {
  constructor(trips) {
    this.id = 0;
    this.trips = trips
  }

  getTotalTripCost() {
    let currentTrips = this.trips.filter(trip => trip.date.includes('2020'));

    let cost = currentTrips.map(trip => {
      return parseInt(trip.getTripCost(trip.travelers))
    });

    cost = cost.reduce((num, tripCost) => num += tripCost);
    return cost.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
}

export default Agent;
