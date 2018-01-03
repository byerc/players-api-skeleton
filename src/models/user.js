const uuid = require('uuid/v4');
// TODO persist data in DB
module.exports = {
  create: ({ first_name, last_name, email, password}) => {
    return new Promise((resolve, reject) => {
      const user = {
        id: uuid(),
        first_name,
        last_name,
        email,
      };
      resolve(user);
    });
  },
  remove: () => {
    return new Promise((resolve, reject) => { resolve(); });
  },
};
