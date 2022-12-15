// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import FranchiseeUser model
const FranchiseeUser = require('../models/franchisees_users')

// Get all franchisees_users
const getFranchiseesUsers = async (req, res, next) => {
    try {

        // build SQL query : select all columns from franchisees_users table
        const data = await pool.query(
            "SELECT * FROM franchisees_users ORDER BY id ASC;"
        );

        // if no result return 404
        if (data.rowCount === 0)
            return res.status(404).send("No franchisee's user exists");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "All franchisees users:",
            data: data.rows
        });

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// create a franchisee_user
const createFranchiseeUser = async (req, res, next) => {

    // get values from body request
    const {id_franchise, id_user} = req.body;

    // sets a franchisee_user with the model
    const franchisee_user = new FranchiseeUser(id_franchise, id_user)

    // build SQL query : insert all columns except id into franchisees_users table, returns the franchisees_users created
    const query =
        "INSERT INTO franchisees_users (id_franchise, id_user)  VALUES($1, $2) RETURNING *;";
    const values = [franchisee_user.id_franchise, franchisee_user.id_user];
    try {

        // send the query
        const data = await pool.query(query, values);

        // if ok send 201
        return res.status(201).json({
            status: 201,
            message: "Franchisee's user added successfully",
            data: data.rows
        });
        // else return error
    } catch (error) {
        return next(error);
    }
};

// get a franchisee_user by its id
const getFranchiseeUserById = async (req, res, next) => {

    // gets id from request params
    const id = parseInt(req.params.id);

    // build SQL query : select all columns from franchisees_users table where id = id in request
    const query = "SELECT * FROM franchisees_users WHERE id=$1;";
    const value = [id];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No franchisee's user exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Franchisee's user:",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// get franchisee_users by its id_user
const getFranchiseeUserByUserId = async (req, res, next) => {

    // gets id from request params
    const id_user = req.params.id;


    // build SQL query : select all columns from franchisees_users table where id = id in request
    const query = "SELECT * FROM franchisees_users WHERE id_user=$1;";
    const value = [id_user];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No user's franchisee exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "User's franchisees",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// get franchisee_users by its id_franchise
const getFranchiseeUsersByFranchiseeId = async (req, res, next) => {

    // gets id from request params
    const id_franchise = req.params.id;


    // build SQL query : select all columns from franchisees_users table where id = id in request
    const query = "SELECT * FROM franchisees_users WHERE id_franchise=$1;";
    const value = [id_franchise];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No user's franchisee exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "User's franchisees",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};


// update a franchisee_user
const updateFranchiseeUser = async (req, res, next) => {

    // set id from request params
    const id = parseInt(req.params.id);

    // set values from request body
    const {id_franchise, id_user} = req.body;

    // create a franchisees_users with the model
    const franchiseeUser = new FranchiseeUser(id_franchise, id_user)

    // build SQL query : update all columns and returns all columns
    const query =
        "UPDATE franchisees_users SET id_franchise=$1, id_user=$2, id=$3 WHERE id=$3 RETURNING *;";
    const value = [franchiseeUser.id_franchise, franchiseeUser.id_user, id];

    try {

        // send query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Franchisee's user does not exist");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "Franchisee's user updated successfully ",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// delete a franchisee_user by its id
const deleteFranchiseeUser = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);
    const value = [id];

    // build SQL query : delete tuple where id = id in request
    const query = "DELETE FROM franchisees_users WHERE id=$1;";

    try {

        // send the query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Franchisee's user does not exist");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Franchisee's user deleted successfully"
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// export functions
module.exports = {
    getFranchiseesUsers,
    createFranchiseeUser,
    getFranchiseeUserById,
    getFranchiseeUserByUserId,
    getFranchiseeUsersByFranchiseeId,
    updateFranchiseeUser,
    deleteFranchiseeUser
};
