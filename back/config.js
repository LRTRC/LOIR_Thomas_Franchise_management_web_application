// import pg module
const Pool = require('pg').Pool;

// import dotenv module
const dotenv = require("dotenv");

// configure dotenv and process.env now has the keys and values defined in .env file
dotenv.config();

//todo explain create a new instance of pool with options
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Whenever the pool establishes a new client connection to the db it will emit the connect
// event with the newly connected client.
pool.on("connect", () => {
    console.log("connected to the db");
});

// same for pool's error event emitter
pool.on('error', (err) => {
    console.log('error ' + err)
})

// export pool as a module
module.exports = {
    pool
};
