import chai from 'chai';
import Trip from '../src/classes/trip';
const expect = chai.expect;

let tripData;
let destinationData;

describe('Trip', function() {

  beforeEach("instantiate variables", function() {
    tripData = {
      date: "2019/09/16",
      destinationID: 49,
      duration: 8,
      id: 1,
      status: "approved",
      suggestedActivities: [],
      travelers: 1,
      userID: 44
    };

    destinationData = [{
      alt: "overview of city buildings with a clear sky",
      destination: "Lima, Peru",
      estimatedFlightCostPerPerson: 400,
      estimatedLodgingCostPerDay: 70,
      id: 1,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixli"
    }];
  });

  it('should be an instance of Trip', function() {
    let trip = new Trip(tripData, destinationData);
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should be able to authenticate a username', function() {
  });

});
