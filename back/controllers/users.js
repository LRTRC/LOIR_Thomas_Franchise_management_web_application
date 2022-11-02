// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import bcrypt module, library to help to hash passwords.
const bcrypt = require("bcrypt");

// import user model
const User = require('../models/users');

// get all users
const getUsers = async (req, res, next) => {
    try {

        // build SQL query : gets all columns from users except passphrase
        const data = await pool.query(
            "SELECT id, first_name, last_name, email, phone, role FROM users ORDER BY id ASC;"
        );
        //if no users returns 404
        if (data.rowCount === 0)
            return res.status(404).send("No user exists");

        // else returns result
        return res.status(200).json({
            status: 200,
            message: "All users:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

// create a single new user
const createUser = async (req, res, next) => {

    // get values from request
    let {first_name, last_name, email, phone, role, passphrase} = req.body;

    // auto-gen a salt and hash and encrypt password to be stored in db
    passphrase = await bcrypt.hash(passphrase, 10).then((hash) => {
        return passphrase = hash;
    });

    // sets a new instance of user Class
    const user = new User(first_name, last_name, email, phone, role, passphrase)

    // build the SQL query : insert in all columns except id and returns all columns except passphrase
    const query =
        "INSERT INTO users (first_name, last_name, email, phone, role, passphrase)  VALUES($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, phone, role;";
    const values = [user.first_name, user.last_name, user.email, user.phone, user.role, user.passphrase];


    try {

        // as we need to run a single query on the database, the pool object has a method to run a query on the
        // first available idle client and return its result.
        const data = await pool.query(query, values);

        // returns the created user
        return res.status(201).json({
            status: 201,
            message: "User added successfully",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};


// get one user by its ID
const getUserById = async (req, res, next) => {

    // get its id from request
    const id = parseInt(req.params.id);

    // build SQL query : select id, first_name, last_name, email, phone, role
    const query = "SELECT id, first_name, last_name, email, phone, role FROM users WHERE id=$1;";
    const value = [id];

    try {

        // launch query
        const data = await pool.query(query, value);

        // if no user found
        if (data.rowCount === 0) return res.status(404).send("No User exists");

        // else sets result in user variable
        let user = data.rows[0]

        // returns the founded user
        return res.status(200).json({
            status: 200,
            message: `User id: ${id} :`,
            data: user
        })
    } catch (error) {
        return next(error);
    }
};

// update an existing user, one by one
const updateUser = async (req, res, next) => {

    // get its id from request
    const id = parseInt(req.params.id);

    // get values to update from request
    const {first_name, last_name, email, phone, role} = req.body;

    // sets a new instance of user Class
    const user = new User(first_name, last_name, email, phone, role)

    // build SQL query : update first_name, last_name, phone, role and returns all except passphrase
    const query =
        "UPDATE users SET first_name=$1, last_name=$2, phone=$3, role=$4, id=$5 WHERE id=$5 RETURNING id, first_name, last_name, email, phone, role;";
    const value = [user.first_name, user.last_name, user.phone, user.role, id];

    try {

        // launch query
        const data = await pool.query(query, value);

        // if no user found
        if (data.rowCount === 0) return res.status(404).send("User does not exist");
        let user = data.rows[0]

        // delete passphrase column todo: to delete
        delete user.passphrase

        // return the updated user
        return res.status(200).json({
            status: 200,
            message: `User id: ${id} updated successfully`,
            data: user
        })
    } catch (error) {
        return next(error);
    }
};


// delete a user
const deleteUser = async (req, res, next) => {

    // get its id from request
    const id = parseInt(req.params.id);
    const value = [id];

    // build SQL query : delete tuple from users where id = id in request
    const query = "DELETE FROM users WHERE id=$1;";

    try {

        // launch query
        const data = await pool.query(query, value);

        // if no user found
        if (data.rowCount === 0) return res.status(404).send("User does not exist");

        // else returns message that users has been deleted
        return res.status(200).json({
            status: 200,
            message: `User id: ${id} deleted successfully`
        })
    } catch (error) {
        return next(error);
    }
};

// export functions
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
