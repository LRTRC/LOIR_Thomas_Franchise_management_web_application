const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/users");

router
    .post("/", auth, createUser)
    .get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
