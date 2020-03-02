import chai from 'chai';
import tripData from './data/trips-data';
import destinationData from './data/destinations-data';
import FetchController from '../src/classes/fetch-controller'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.window = {};
chai.spy.on(window, 'fetch', () => {});

let agent;
let trips;

describe('Fetch', function() {

  beforeEach("instantiate variables", function() {
  });

  it('', function() {
    
  });

});
