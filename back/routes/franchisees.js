// import express module

const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import isAdmin middleware
const isAdmin = require('../middleware/isAdmin')

// import controller for the entity "franchisee"
const {
    getFranchisees,
    createFranchisee,
    getFranchiseesById,
    updateFranchisee,
    deleteFranchisee
} = require("../controllers/franchisees");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, isAdmin, createFranchisee)
    .get("/", auth, isAdmin, getFranchisees);
router.post("/details", auth, getFranchiseesById);
router.patch("/:id", auth, isAdmin,updateFranchisee);
router.delete("/:id", auth, isAdmin, deleteFranchisee);

module.exports = router;
