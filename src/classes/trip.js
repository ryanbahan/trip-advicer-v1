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

}

export default Trip;
