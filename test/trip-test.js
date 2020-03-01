import chai from 'chai';
import Trip from '../src/classes/trip';
const expect = chai.expect;

let trip1;
let trip2;
let tripData2;
let tripData1;
let destinationData;

describe('Trip', function() {

  beforeEach("instantiate variables", function() {
    tripData1 = {
      date: "2019/09/16",
      destinationID: 49,
      duration: 8,
      id: 1,
      status: "approved",
      suggestedActivities: [],
      travelers: 1,
      userID: 44
    };

    tripData2 = {
      date: "2019/09/16",
      destinationID: 2,
      duration: 5,
      id: 1,
      status: "approved",
      suggestedActivities: [],
      travelers: 3,
      userID: 44
    };

    destinationData = [{
      alt: "overview of city buildings with a clear sky",
      destination: "Lima, Peru",
      estimatedFlightCostPerPerson: 400,
      estimatedLodgingCostPerDay: 70,
      id: 49,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixli"
    },
    {
      alt: "overview of city buildings with a clear sky",
      destination: "Lima, Peru",
      estimatedFlightCostPerPerson: 600,
      estimatedLodgingCostPerDay: 98,
      id: 2,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixli"
    }];

    trip1 = new Trip(tripData1, destinationData);
    trip2 = new Trip(tripData2, destinationData);
  });

  it('should be an instance of Trip', function() {
    expect(trip1).to.be.an.instanceof(Trip);
  });

  it('should be able to calculate a total trip cost', function() {
    expect(trip1.getTripCost()).to.equal('1056');
    expect(trip2.getTripCost()).to.equal('1199');
  });

  it('should be able to calculate individual trip cost', function() {
    expect(trip1.getIndividualCost(trip1.travelers)).to.equal('1056');
    expect(trip2.getIndividualCost(trip2.travelers)).to.equal('840');
  });

});
