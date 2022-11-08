// import express module

const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import controller for the entity "franchisees_users"
const {
    getFranchiseesUsers,
    createFranchiseeUser,
    getFranchiseeUserById,
    updateFranchiseeUser,
    deleteFranchiseeUser
} = require("../controllers/franchisees_users");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, createFranchiseeUser)
    .get("/", auth, getFranchiseesUsers);
router.get("/:id", auth, getFranchiseeUserById);
router.patch("/:id", auth, updateFranchiseeUser);
router.delete("/:id", auth, deleteFranchiseeUser);

module.exports = router;
