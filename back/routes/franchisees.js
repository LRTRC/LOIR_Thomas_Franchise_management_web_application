const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getFranchisees,
    createFranchisee,
    getFranchiseeById,
    updateFranchisee,
    deleteFranchisee
} = require("../controllers/franchisees");

router
    .post("/", auth, createFranchisee)
    .get("/", auth, getFranchisees);
router.get("/:id", auth, getFranchiseeById);
router.patch("/:id", auth, updateFranchisee);
router.delete("/:id", auth, deleteFranchisee);

module.exports = router;
