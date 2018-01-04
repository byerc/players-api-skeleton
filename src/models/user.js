const uuid = require('uuid/v4');
class User {
  constructor() {
    this.users = [];
  }
  async create({ first_name, last_name, email, password}) {
    const user = {
      id: uuid(),
      first_name,
      last_name,
      email,
    };
    this.users.push({ ...user, password });
    return user;
  }
  async remove(id) {

  }
}

module.exports = new User();
