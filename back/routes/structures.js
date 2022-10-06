const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getStructures,
    createStructure,
    getStructureById,
    updateStructure,
    deleteStructure
} = require("../controllers/structures");

router
    .post("/", auth, createStructure)
    .get("/", auth, getStructures);
router.get("/:id", auth, getStructureById);
router.patch("/:id", auth, updateStructure);
router.delete("/:id", auth, deleteStructure);

module.exports = router;
