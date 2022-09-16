// import express
const express = require('express');
// import franchisees router
const franchiseesRouter = require("./routes/franchisees");
const structuresRouter = require("./routes/structures");

// calls the method express to create an app express
const app = express();

// This middleware sets on all request that have a json content
// and gave access to the body of the request
app.use(express.json());

app.use("/franchisees", franchiseesRouter);
app.use("/structures", structuresRouter);

// export app to access it from node server
module.exports = app;