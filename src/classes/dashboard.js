import Traveler from './traveler';
import Agent from './agent';

class Dashboard {
  constructor() {
    this.currentUser = [];
  }

  displayTravelerDashboard(user) {
    this.currentUser = new Traveler(user);
    return `<div>traveler!</div>`
  }

  displayAdminDashboard() {
    this.currentUser = new Agent();
    return `<div>admin!</div>`
  }

}

export default Dashboard;
