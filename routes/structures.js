const express = require("express");
const router = express.Router();
const {
    getStructures,
    createStructure,
    getStructureById,
    updateStructure,
    deleteStructure
} = require("../controllers/structures");

router
    .post("/", createStructure)
    .get("/", getStructures);
router.get("/:id", getStructureById);
router.patch("/:id", updateStructure);
router.delete("/:id", deleteStructure);

module.exports = router;
