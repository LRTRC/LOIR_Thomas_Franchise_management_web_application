// import express module

const express = require("express");

// import router from express to create modular road managers
const router = express.Router();

// import auth middleware because those routes must be protected by authentication
// todo: try router.use(auth) (less verbose)
const auth = require('../middleware/auth');

// import isAdmin middleware
const isAdmin = require('../middleware/isAdmin')

// import controller for the entity "franchisees_users"
const {
    getFranchiseesUsers,
    createFranchiseeUser,
    getFranchiseeUserById,
    getFranchiseeUserByUserId,
    getFranchiseeUsersByFranchiseeId,
    updateFranchiseeUser,
    deleteFranchiseeUser
} = require("../controllers/franchisees_users");


// As API REST pattern, we will define routes and middlewares to get access to data
// from our database with simple CRUDs
router
    .post("/", auth, isAdmin, createFranchiseeUser)
    .get("/", auth, isAdmin, getFranchiseesUsers);
router.get("/:id", auth, isAdmin, getFranchiseeUserById);
router.get("/user/:id", auth, getFranchiseeUserByUserId);
router.get("/franchise/:id", auth, getFranchiseeUsersByFranchiseeId);
router.patch("/:id", auth, isAdmin, updateFranchiseeUser);
router.delete("/:id", auth, isAdmin, deleteFranchiseeUser);

module.exports = router;
