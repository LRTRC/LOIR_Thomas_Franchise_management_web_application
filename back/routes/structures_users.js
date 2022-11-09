// import express module

const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import controller for the entity "structures_users"
const {
    getStructuresUsers,
    createStructureUser,
    getStructureUserById,
    updateStructureUser,
    deleteStructureUser
} = require("../controllers/structures_users");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, createStructureUser)
    .get("/", auth, getStructuresUsers);
router.get("/:id", auth, getStructureUserById);
router.patch("/:id", auth, updateStructureUser);
router.delete("/:id", auth, deleteStructureUser);

module.exports = router;
