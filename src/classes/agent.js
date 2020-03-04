let moment = require('moment');

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



  getTripsByMonth() {

    return this.trips.reduce((obj, trip) => {
      trip.month = moment(trip.date).month(trip.date).format('MMM');
      let cost = trip.getTripCost(trip.travelers);
      obj[trip.month].push(cost);
      return obj;
    }, {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: []
    })
  }


}

export default Agent;
