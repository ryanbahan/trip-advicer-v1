import FetchController from './fetch-controller'

class Trip {
  constructor(trip, destinations) {
    this.id = trip.id,
    this.userID = trip.userID,
    this.destinationID = trip.destinationID,
    this.travelers = trip.travelers,
    this.date = trip.date,
    this.duration = trip.duration,
    this.status = trip.status,
    this.suggestedActivities = trip.suggestedActivities
    this.destination = destinations.find(destination => destination.id === this.destinationID)
  }

  getTripCost(people = 1) {
    let sum = this.destination.estimatedLodgingCostPerDay *
              this.duration +
              this.destination.estimatedFlightCostPerPerson *
              people;

    let total = (sum * 0.1) + sum;

    return `${total.toFixed()}`;
  }

  getIndividualCost(people) {
    let tripCost = this.getTripCost(people);
    return (tripCost / people).toFixed();
  }

}

export default Trip;
