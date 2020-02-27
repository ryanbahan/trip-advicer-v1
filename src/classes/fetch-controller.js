class FetchController {
  constructor() {}

  static async getUser(id) {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`);

    let user = await response.json();

    return user;
  }
}

export default FetchController;
