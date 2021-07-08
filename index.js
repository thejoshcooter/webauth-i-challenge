// import server
const server = require('./api/server');

// implement heroku ready port
const port = process.env.PORT || 5000

// server listen
server.listen(port, () => 
console.log(`** server magic happening on port ${port} **`));