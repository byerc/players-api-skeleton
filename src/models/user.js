const { query } = require('../db');
const table = 'ping_pong_players.users';

const User = {

  create: async ({ first_name, last_name, email, password}) => {
    const existingUser = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    if (existingUser.length > 0) {
      throw new Error('User exists!');
    }
    const user = await query(`INSERT INTO ${ table } (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email`, [first_name, last_name, email, password]);
    return user;
  },

  remove: async () => {
    await query(`DELETE FROM ${ table }`);
  },

  findUserByEmail: async (email) => {
    const users = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    return users[0];
  }

};

module.exports = User;
