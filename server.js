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

// import bcrypt
const bcrypt = require('bcrypt');

// register user endpoint
server.post('/api/register', (req, res) => {
    // res.status(200).json({ message: 'success' })
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;

    db('users')
    .insert(user)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(400).json({ error: 'error registering user', err })
    })
});

// user login endpoint
server.post('/api/login', (req, res) => {
    // res.status(200).json({ message: 'success' })
    const { username, password } = req.body;
    db('users')
    .where({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json(user)
        } else {
            res.status(400).json({ error: 'you shall not pass' })
        }
    })
    .catch(err => {
        res.status(404).json({ error: 'error', err })
    })
});

// get users endpoint
server.get('/api/users', (req, res) => {
    // res.status(200).json({ message: 'success' });
    db('users')
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(404).json({ error: 'user not found', err })
    })
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