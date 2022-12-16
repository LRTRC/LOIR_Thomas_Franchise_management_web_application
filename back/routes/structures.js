// import express module
const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import isAdmin middleware
const isAdmin = require('../middleware/isAdmin')

// import controller for the entity "structures"
const {
    getStructures,
    createStructure,
    getStructuresById,
    getStructuresByIdFranchise,
    updateStructure,
    deleteStructure
} = require("../controllers/structures");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, isAdmin, createStructure)
    .get("/", auth, isAdmin, getStructures);
router.post("/details/", auth, getStructuresById);
router.get("/franchise/:id", auth, getStructuresByIdFranchise);
router.patch("/:id", auth, isAdmin, updateStructure);
router.delete("/:id", auth, isAdmin, deleteStructure);

module.exports = router;
