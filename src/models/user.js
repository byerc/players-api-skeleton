const uuid = require('uuid/v4');
const find = require('lodash.find');

class User {
  constructor() {
    this.users = [];
  }

  async create({ first_name, last_name, email, password}) {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User exists!');
    }
    const user = {
      id: uuid(),
      first_name,
      last_name,
      email,
    };
    this.users.push({ ...user, password });
    return user;
  }

  async findUserByEmail(email) {
    return find(this.users, (u) => { return u.email === email; });
  }

  async remove() {
    this.users = [];
  }
}

module.exports = new User();
