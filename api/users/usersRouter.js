// imports
const express = require('express'); // import express

// create router
const router = express.Router();

// implement knex db connection
const db = require('../../data/dbConfig');

// get users endpoint
router.get('/', (req, res) => {
    // res.status(200).json({ message: 'success' });
    db('users')
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(404).json({ error: 'user not found', err })
    })
});

module.exports = router;