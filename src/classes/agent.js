class Agent {
  constructor(trips) {
    this.id = 0;
    this.trips = trips
  }

  getTotalCommission() {
    let currentTrips = this.trips.filter(trip => trip.date.includes('2020') && trip.status === "approved");

    let cost = currentTrips.map(trip => {
      return parseInt(trip.getTripCost(trip.travelers))
    });

    cost = cost.reduce((num, tripCost) => num += tripCost);
    cost = cost * (1/11);

    return cost.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
}

export default Agent;
