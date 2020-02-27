import chai from 'chai';
import Authenticator from '../src/classes/authenticator';
const expect = chai.expect;

describe('Authenticator', function() {

  it('should be an instance of Authenticator', function() {
    let authenticator = new Authenticator();
    expect(authenticator).to.be.an.instanceof(Authenticator);
  });

  it('should be able to authenticate a username', function() {
    expect(Authenticator.validateUsername('agent')).to.equal(true);
    expect(Authenticator.validateUsername('traveler1')).to.equal(true);
    expect(Authenticator.validateUsername('traveler')).to.equal(false);
    expect(Authenticator.validateUsername('traveler51')).to.equal(false);
  });

  it('should be able to authenticate a password', function() {
  });

});
