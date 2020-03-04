import chai from 'chai';
import Trip from '../src/classes/trip';
import Agent from '../src/classes/agent';
import tripData from './data/trips-data';
import destinationData from './data/destinations-data';
const expect = chai.expect;

let agent;
let trips;

describe('Agent', function() {

  beforeEach("instantiate variables", function() {
    trips = tripData.trips.map(trip => new Trip(trip, destinationData.destinations));
    agent = new Agent(0, trips);
  });

  it('should be an instance of Agent', function() {
    expect(agent).to.be.an.instanceof(Agent);
  });

  it('should be able to calculate total commission revenue', function() {
    expect(agent.getTotalCommission()).to.equal('$90,285.00');
  });

});
