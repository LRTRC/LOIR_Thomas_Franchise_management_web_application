//todo explain import pool from pg package and class Pool
const Pool = require('pg').Pool;

//todo explain import from dotenv package
const dotenv = require("dotenv");

//todo explain dotenv calls config()
dotenv.config();

//todo explain create a new instance of pool with options
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// todo explain node event listener
pool.on("connect", () => {
    console.log("connected to the db");
});

pool.on('error', (err) => {
    console.log('error ' + err)
})

// export pool as a module
module.exports = {
    pool
};
