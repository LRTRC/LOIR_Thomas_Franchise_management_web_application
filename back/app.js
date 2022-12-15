// import express module
const express = require('express');

// import cors module
const cors = require('cors');

// import routers
const franchiseesRouter = require("./routes/franchisees");
const structuresRouter = require("./routes/structures");
const usersRouter = require("./routes/users");
const franchiseesUsersRouter = require("./routes/franchisees_users");
const structuresUsersRouter = require("./routes/structures_users");
const authRouter = require("./routes/auth");

// import isAdmin middleware
const isAdmin = require('./middleware/isAdmin')


// calls the method express to create an app express
const app = express();

// set a middleware for all routes and requests, as there is no path in the first argument
app.use((req, res, next) => {
    // allow to access to the API from all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // set headers properties allowed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // set headers methods allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// This middleware sets on all request that have a json content
// and gave access to the body of the request
app.use(express.json());

// sets cors as middleware
app.use(cors());

// As API REST pattern, sets the different routers for main entities available in the API
// with a corresponding path
app.use("/api/franchisees",franchiseesRouter);
app.use("/api/structures", structuresRouter);
app.use("/api/users", isAdmin, usersRouter);
app.use("/api/franchisees_users",franchiseesUsersRouter);
app.use("/api/structures_users",structuresUsersRouter);
app.use("/auth", authRouter);

// export app to access it from node server
module.exports = app;