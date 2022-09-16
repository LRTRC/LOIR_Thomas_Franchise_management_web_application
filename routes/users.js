
const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/franchisees");

router
    .post("/", createUser)
    .get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
