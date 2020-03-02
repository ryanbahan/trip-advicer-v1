import chai from 'chai';
import Trip from '../src/classes/trip';
import Traveler from '../src/classes/traveler';
import Agent from '../src/classes/agent';
import tripData from './data/trips-data';
import userData from './data/users-data';
import destinationData from './data/destinations-data';
const expect = chai.expect;

let traveler;
let trips;

describe('Traveler', function() {

  beforeEach("instantiate variables", function() {
    trips = tripData.trips.map(trip => new Trip(trip, destinationData.destinations));
    traveler = new Traveler(userData.travelers[0]);
    traveler.trips = trips.filter(trip => trip.userID === traveler.id);
  });

  it('should be an instance of Traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should be able to calculate total trip cost of the travelers trips', function() {
    expect(traveler.getTotalTripCost()).to.equal('$0');
  });

});
