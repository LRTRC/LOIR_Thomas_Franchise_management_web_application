// import express module
const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import controller for the entity "structures"
const {
    getStructures,
    createStructure,
    getStructureById,
    updateStructure,
    deleteStructure
} = require("../controllers/structures");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, createStructure)
    .get("/", auth, getStructures);
router.get("/:id", auth, getStructureById);
router.patch("/:id", auth, updateStructure);
router.delete("/:id", auth, deleteStructure);

module.exports = router;
