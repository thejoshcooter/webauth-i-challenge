// import knex
const knex = require('knex');
// import knex config
const knexConfig = require('../api/knexfile');
// implement knex and config
const db = knex(knexConfig.development);

module.exports = db;