import chai from 'chai';
import Authenticator from '../src/classes/authenticator';
const expect = chai.expect;

describe('Authenticator', function() {

  it('should return true', function() {
    let authenticator = new Authenticator();
    expect(authenticator).to.be.an.instanceof(Authenticator);
  });

});
