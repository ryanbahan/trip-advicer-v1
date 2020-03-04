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
      let cost = trip.getTripCost(trip.travelers) * 1/11;
      obj[trip.month] += parseInt(cost);
      return obj;
    }, {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0
    })
  }


}

export default Agent;
