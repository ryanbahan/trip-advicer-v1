import chai from 'chai';
import Authenticator from '../src/classes/authenticator';
const expect = chai.expect;

describe('Authenticator', function() {

  it('should be an instance of Authenticator', function() {
    let authenticator = new Authenticator();
    expect(authenticator).to.be.an.instanceof(Authenticator);
  });

  it('should be able to authenticate a username', function() {
    // Happy paths
    expect(Authenticator.validateUsername('agent')).to.equal(true);
    expect(Authenticator.validateUsername('traveler1')).to.equal(true);
    // Sad paths
    expect(Authenticator.validateUsername('traveler')).to.equal(false);
    expect(Authenticator.validateUsername('traveler100')).to.equal(false);
    expect(Authenticator.validateUsername('traveler51')).to.equal(false);
  });

  it('should be able to authenticate a password', function() {
    // Happy path
    expect(Authenticator.validatePassword('travel2020')).to.equal(true);

    // Sad paths
    expect(Authenticator.validatePassword('travel202')).to.equal(false);
    expect(Authenticator.validatePassword('travel202008')).to.equal(false);
    expect(Authenticator.validatePassword('duhh')).to.equal(false);
  });

  it('should be able to validate or deny a login request', function() {
    // Happy paths
    expect(Authenticator.validate('traveler1', 'travel2020')).to.equal(true);
    expect(Authenticator.validate('traveler5', 'travel2020')).to.equal(true);
    expect(Authenticator.validate('traveler50', 'travel2020')).to.equal(true);
    expect(Authenticator.validate('agent', 'travel2020')).to.equal(true);

    // Sad paths
    expect(Authenticator.validate('traveler', 'travel2020')).to.equal(false);
    expect(Authenticator.validate('traveler51', 'travel2020')).to.equal(false);
    expect(Authenticator.validate('traveler500', 'travel2020')).to.equal(false);
    expect(Authenticator.validate('agents', 'travel2020')).to.equal(false);
  });

  it('should be able to check for an admin user', function() {
    // Is admin
    expect(Authenticator.checkAdmin('agent')).to.equal('admin');

    // Is not admin
    expect(Authenticator.checkAdmin('traveler1')).to.equal('traveler');
    expect(Authenticator.checkAdmin('traveler50')).to.equal('traveler');
    expect(Authenticator.checkAdmin('traveler15')).to.equal('traveler');

    // Sad paths
    expect(Authenticator.checkAdmin('travel')).to.equal(false);
    expect(Authenticator.checkAdmin('agent0')).to.equal(false);
    expect(Authenticator.checkAdmin('agents')).to.equal(false);
  });

});
