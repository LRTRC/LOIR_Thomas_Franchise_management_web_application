const express = require("express");
const router = express.Router();
const {
    getFranchisees,
    createFranchisee,
    getFranchiseeById,
    updateFranchisee,
    deleteFranchisee
} = require("../controllers/franchisees");

router
    .post("/", createFranchisee)
    .get("/", getFranchisees);
router.get("/:id", getFranchiseeById);
router.patch("/:id", updateFranchisee);
router.delete("/:id", deleteFranchisee);

module.exports = router;
