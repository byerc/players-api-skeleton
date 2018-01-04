// Hacky way to mimic a primary key
const uuid = require('uuid/v4');
const find = require('lodash.find');
class Player {
  constructor () {
    this.players = [];
  }

  async create({ first_name, last_name, rating, handedness, created_by }) {
    const existingPlayer = find(this.players, (p) => { return p.first_name === first_name && p.last_name === last_name });
    if (existingPlayer) {
      throw new Error('Player already exists!');
    }
    let player = {
      id: uuid(),
      first_name,
      last_name,
      rating,
      handedness,
      created_by,
    };
    this.players.push(player);
    return player;
  }

  async remove(playerId) {
    if (typeof playerId === 'object') {
      this.players = [];
      return;
    }
    const player = find(this.players, (p) => { return p.id === playerId });
    if (!player) {
      throw new Error('Player does not exist!');
    }
    this.players = this.players.filter(player => player.id === playerId);
  }

  async find(userId) {
    return this.players.map(player => player.created_by === userId);
  }

  async findById(playerId) {
    return this.players.map(player => player.id === playerId);
  }
}

module.exports = new Player();
