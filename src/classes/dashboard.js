import Traveler from './traveler';
import Agent from './agent';

class Dashboard {
  constructor() {
    this.currentUser = [];
  }

  displayTravelerDashboard(user) {
    this.currentUser = new Traveler(user);
    console.log(this.currentUser);
  }

  displayAdminDashboard() {
    this.currentUser = new Agent();
    console.log(this.currentUser);
  }

}

export default Dashboard;
