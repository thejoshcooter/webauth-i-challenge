// import express
const express = require('express');
// implement server
const server = express();
// body parser
server.use(express.json());

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