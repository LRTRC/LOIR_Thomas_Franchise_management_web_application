// import express module
const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import isAdmin middleware
const isAdmin = require('../middleware/isAdmin')

// import controller for the entity "user"
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/users");

// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, isAdmin, createUser)
    .get("/", auth, isAdmin, getUsers);
router.get("/:id", auth, getUserById);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

module.exports = router;
