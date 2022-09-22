const {pool} = require("../config");

const getUsers = async (req, res, next) => {
    try {
        const data = await pool.query(
            "SELECT * FROM users ORDER BY id ASC;"
        );

        if (data.rowCount === 0)
            return res.status(404).send("No user exists");

        return res.status(200).json({
            status: 200,
            message: "All users:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const createUser = async (req, res, next) => {
    const {first_name, last_name, email, phone, role, passphrase} = req.body;
    const query =
        "INSERT INTO users (first_name, last_name, email, phone, role, passphrase)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *;";
    const values = [first_name, last_name, email, phone, role, passphrase];
    try {
        const data = await pool.query(query, values);

        return res.status(201).json({
            status: 201,
            message: "User added successfully",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM users WHERE id=$1;";
    const value = [id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("No User exists");

        return res.status(200).json({
            status: 200,
            message: "User:",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const {first_name, last_name, email, phone, role, passphrase} = req.body;

    const query =
        "UPDATE users SET first_name=$1, last_name=$2, email=$3, phone=$4, role=$5, passphrase=$6, id=$7 WHERE id=$7 RETURNING *;";
    const value = [first_name, last_name, email, phone, role, passphrase, id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("User does not exist");

        return res.status(200).json({
            status: 200,
            message: "User updated successfully ",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const value = [id];
    const query = "DELETE FROM users WHERE id=$1;";

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("User does not exist");

        return res.status(200).json({
            status: 200,
            message: "User deleted successfully"
        })
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
