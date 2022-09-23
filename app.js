// import express
const express = require('express');

// import franchisees router
const franchiseesRouter = require("./routes/franchisees");
const structuresRouter = require("./routes/structures");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// calls the method express to create an app express
const app = express();

// This middleware sets on all request that have a json content
// and gave access to the body of the request
app.use(express.json());

app.use("/api/franchisees", franchiseesRouter);
app.use("/api/structures", structuresRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// export app to access it from node server
module.exports = app;