// import express module
const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth controller
const {login} = require("../controllers/auth");

// sets login middleware on /auth/login path with the action post
router.post("/login", login);

// don't forget to export it
module.exports = router;
