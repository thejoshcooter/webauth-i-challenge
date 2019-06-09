// import express
const express = require('express');
// import knex 
const knex = require('knex');

// implement server
const server = express();
// body parser
server.use(express.json());

// import knex config
const knexConfig = require('./knexfile');
// implement knex db connection
const db = knex(knexConfig.development);

// register user endpoint
server.post('/api/register', (req, res) => {
    res.status(200).json({ message: 'success' })
});

// user login endpoint
server.post('/api/login', (req, res) => {
    res.status(200).json({ message: 'success' })
});

// get users endpoint
server.get('/api/users', (req, res) => {
    res.status(200).json({ message: 'success' });
});

// default fallback
server.get('/', (req, res) => {
    res.status(200).json({ message: 'dark magic casting' });
})

// 404 fallback
server.use('/', (req, res) => {
    res.status(404).json({ message: 'could not find the castle you seek' });
});

// export server
module.exports = server;