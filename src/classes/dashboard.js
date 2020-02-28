import Traveler from './traveler';
import Agent from './agent';

class Dashboard {
  constructor() {
    this.currentUser = [];
  }

  async displayTravelerDashboard(user) {
    this.currentUser = new Traveler(user);
    this.createTripCards(await this.currentUser.getTrips());

    return `<nav><h1>TripAdvicer</h1></nav><div class="user-options">
    <div class=options-top><h2>Your Trips</h2><p class="total-spent">Total Expenses: $XX</p></div><hr>
    <div class="options-buttons"><button>Pending</button><button>Approved</button><button>Past</button></div>
    </div>
    <main id="grid-content">
    <section class="book-trip-card">
    <h3>Book a new trip!</h3>
    </section>
    <section class="trip-card">
    <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
    <h3>Trip name</h3>
    </section>
    <section class="trip-card">
    <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
    <h3>Trip name</h3>
    </section>
    <section class="trip-card">
    <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
    <h3>Trip name</h3>
    </section>
    <section class="trip-card">
    <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
    <h3>Trip name</h3>
    </section>
    <section class="trip-card">
    <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
    <h3>Trip name</h3>
    </section>
    </main>`
  }

  displayAdminDashboard() {
    this.currentUser = new Agent();
    return `<div>admin!</div>`
  }

  createTripCards(trips) {
    let tripCards = trips.map(trip => {
      let html = `<section class="trip-card" id="${trip.id}">
          <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
          <h3>Trip name</h3>
          </section>`;
    })

    console.log(trips);
  }

}

export default Dashboard;
