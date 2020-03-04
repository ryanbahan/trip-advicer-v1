class User {
  constructor(user, trips) {
    this.id = user.id || 0;
    this.trips = trips || []
  }
}

export default User;
