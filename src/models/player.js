const { query }= require('../db');
const table = 'ping_pong_players.players';

const Player = {
  create: async function({ first_name, last_name, rating, handedness, created_by }) {
    // Check if user is trying to create an already existing player
    const existingPlayers = await query(`SELECT * FROM ${ table } WHERE first_name = $1 AND last_name = $2`, [first_name, last_name]);
    if (existingPlayers.length > 0) {
      throw new Error('Player already exists!');
    }
    const player = query(`INSERT INTO ${ table } (first_name, last_name, rating, handedness, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, handedness, rating, created_by`, [first_name, last_name, rating, handedness, created_by]);
    return player;
  },

  remove: async function() {
    await query(`DELETE FROM ${ table }`);
  },

  deleteById: async function(ids) {
    const { playerId, userId } = ids;
    // Get player by id and if the player was created by the requesting user
    const players = await query(`SELECT * FROM ${ table } WHERE id = $1 AND created_by = $2`, [playerId, userId]);
    // If a player isn't returned, we know that one of the conditions weren't
    // met and we should throw an error.
    if (players.length === 0) {
      throw new Error('Unable to delete specified player!');
    }
    // Delete the player from table by ID
    await query(`DELETE FROM ${ table } WHERE id = $1`, [playerId]);
  },

  findById: async function(playerId) {
    const players = await query(`SELECT * FROM ${ table } WHERE id = $1`, [playerId]);
    return players[0];
  },

  findPlayersForUser: async function (userId) {
    return await query(`SELECT * FROM ${ table } WHERE created_by = $1`, [userId]);
  }
};

module.exports = Player;
