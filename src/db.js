const pgp = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;

const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || '';
const database = process.env.PG_DB || 'postgres';
const host = process.env.PG_HOST || 'localhost';
const port = process.env.PG_PORT || '5432';

const db = pgp({ user, password, database, host, port });

async function query(query, parameters) {
  const func = getQueryFunction(query);
  const q = parameters ? new PQ(query, parameters) : query;
  return await func(q);
}

function getQueryFunction(query) {
  // split query by space and get first element for type
  const arr = query.split(' ');
  const type = arr[0];
  let func;

  switch (type) {
    case 'SELECT':
      func = db.any;
    break;
    case 'INSERT':
      func = db.one;
    break;
    default:
      func = db.query;
  }

  return func;
}

module.exports = { query };
