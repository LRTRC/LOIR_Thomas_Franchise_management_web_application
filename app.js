// import express
const express = require('express');

// calls the method express to create an app express
const app = express();

// This middleware sets on all request that have a json content
// and gave access to the body of the request
app.use(express.json());

// export app to access it from node server
module.exports = app;