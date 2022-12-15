// import express module

const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import isAdmin middleware
const isAdmin = require('../middleware/isAdmin')

// import controller for the entity "structures_users"
const {
    getStructuresUsers,
    createStructureUser,
    getStructureUserById,
    getStructureUserByUserId,
    updateStructureUser,
    deleteStructureUser
} = require("../controllers/structures_users");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, isAdmin, createStructureUser)
    .get("/", auth, isAdmin, getStructuresUsers);
router.get("/:id", auth, isAdmin, getStructureUserById);
router.get("/user/:id", auth, getStructureUserByUserId);
router.patch("/:id", auth, isAdmin, updateStructureUser);
router.delete("/:id", auth, isAdmin, deleteStructureUser);

module.exports = router;
