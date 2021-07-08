// imports
const express = require('express'); // import express
const bcrypt = require('bcrypt'); // import bcrypt
const restricted = require('./restricted-middleware'); // restricted middleware

// implement db access
const db = require('../../data/dbConfig');

// create router
const router = express.Router();

// register user endpoint
router.post('/register', (req, res) => {
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
router.post('/login', restricted, (req, res) => {
    // res.status(200).json({ message: 'success' })
    db('users')
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(404).json({ error: 'users not found', err })
    })
});

module.exports = router;