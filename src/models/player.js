module.exports = {
  create: ({ first_name, last_name, rating, handedness }) => {
    return new Promise((resolve, reject) => {
      let player = {
        first_name,
        last_name,
        rating,
        handedness,
      };
      resolve(player);
    });
  },
  remove: () => {
    return new Promise((resolve, reject) => { resolve(); });
  },
};
