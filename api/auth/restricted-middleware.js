// import bcrypt
const bcrypt = require('bcrypt');

// import db
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = function restricted(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    db("users")
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next()
        } else {
          res.status(400).json({ error: "you shall not pass" });
        }
      })
      .catch(err => {
        res.status(404).json({ error: "error", err });
      })
  } else {
    res.status(400).json({ message: "access restricted" });
  }
};