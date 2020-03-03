import chai from 'chai';
import tripData from './data/trips-data';
import userData from './data/users-data';
import destinationData from './data/destinations-data';
import FetchController from '../src/classes/fetch-controller';
import Trip from '../src/classes/trip';
import Traveler from '../src/classes/traveler';
import Agent from '../src/classes/agent';

const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

let traveler;
let agent;
let trips;

describe('Fetch', function() {

  beforeEach("instantiate variables", function() {

    trips = tripData.trips.map(trip => new Trip(trip, destinationData.destinations));
    traveler = new Traveler(userData.travelers[0]);
    traveler.trips = trips.filter(trip => trip.userID === traveler.id);

    chai.spy.on(FetchController, ['getUser', 'getAllUsers', 'getTrips', 'getDestinations', 'postTrip', 'approveTrip', 'denyTrip'], () => new Promise((resolve, reject) => {}));
  });

  it('should be able to get a user', function() {
      FetchController.getUser(traveler.id);

      expect(FetchController.getUser).to.be.called(1);
      expect(FetchController.getUser).to.be.called.with(traveler.id);
  });

  it('should be able to get all users', function() {
      FetchController.getAllUsers();

      expect(FetchController.getAllUsers).to.be.called(1);
  });

  it('should be able to get all trips', function() {
      FetchController.getTrips();

      expect(FetchController.getTrips).to.be.called(1);
  });

  it('should be able to get all destinations', function() {
      FetchController.getDestinations();

      expect(FetchController.getDestinations).to.be.called(1);
  });

  it('should be able to post a trip', function() {
      FetchController.postTrip(trips[0]);

      expect(FetchController.postTrip).to.be.called(1);
      expect(FetchController.postTrip).to.be.called.with(trips[0]);
  });

  it('should be able to approve a trip', function() {
      FetchController.approveTrip(trips[0].id);

      expect(FetchController.approveTrip).to.be.called(1);
      expect(FetchController.approveTrip).to.be.called.with(trips[0].id);
  });

  it('should be able to deny a trip', function() {
      FetchController.denyTrip(trips[0].id);

      expect(FetchController.denyTrip).to.be.called(1);
      expect(FetchController.denyTrip).to.be.called.with(trips[0].id);
  });

  afterEach(function () {
    chai.spy.restore();
  });

});
