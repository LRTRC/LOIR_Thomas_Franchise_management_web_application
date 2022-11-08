// import express module
const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth controller
const {login, refreshToken} = require("../controllers/auth");

// sets login middleware on /auth/login path with the action post
router.post("/login", login);
router.post("/refresh_token", refreshToken)

// don't forget to export it
module.exports = router;
