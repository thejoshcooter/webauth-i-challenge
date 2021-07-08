// library imports
const express = require('express'); // import express
const helmet = require('helmet'); // import helmet
const cors = require('cors'); // import cors
const session = require('express-session');

// initialize server
const server = express(); // implement server
server.use(express.json()); // body parser

// router imports
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');

// implement knex db connection
const db = require('../data/dbConfig');


// middleware
const restricted = require('../api/auth/restricted-middleware'); // restricted

// routers
server.use('/api', authRouter);
server.use('/api/users', usersRouter);

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