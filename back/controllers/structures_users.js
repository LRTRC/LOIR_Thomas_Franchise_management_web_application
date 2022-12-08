// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import Structure User model
const StructureUser = require('../models/structures_users')

// Get all structures_users
const getStructuresUsers = async (req, res, next) => {
    try {

        // build SQL query : select all columns from structures_users table
        const data = await pool.query(
            "SELECT * FROM structures_users ORDER BY id ASC;"
        );

        // if no result return 404
        if (data.rowCount === 0)
            return res.status(404).send("No structure's user exists");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "All structures users:",
            data: data.rows
        });

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// create a structure_user
const createStructureUser = async (req, res, next) => {

    // get values from body request
    const {id_structure, id_user} = req.body;

    // sets a structure_user with the model
    const structure_user = new StructureUser(id_structure, id_user)

    // build SQL query : insert all columns except id into structures_users table, returns the structures_users created
    const query =
        "INSERT INTO structures_users (id_structure, id_user)  VALUES($1, $2) RETURNING *;";
    const values = [structure_user.id_structure, structure_user.id_user];
    try {

        // send the query
        const data = await pool.query(query, values);

        // if ok send 201
        return res.status(201).json({
            status: 201,
            message: "Structure's user added successfully",
            data: data.rows
        });
        // else return error
    } catch (error) {
        return next(error);
    }
};

// get a structure_user by its id
const getStructureUserById = async (req, res, next) => {

    // gets id from request params
    const id = parseInt(req.params.id);

    // build SQL query : select all columns from structures_users table where id = id in request
    const query = "SELECT * FROM structures_users WHERE id=$1;";
    const value = [id];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No structure's user exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Structure's user:",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};


// get a franchisee_user by its user_id
const getStructureUserByUserId = async (req, res, next) => {

    // gets id from request params
    const {id_user} = req.body;

    // build SQL query : select all columns from franchisees_users table where id = id in request
    const query = "SELECT * FROM structures_users WHERE id_user=$1;";
    const value = [id_user];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No user's structure exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "User's structures",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// update a structure_user
const updateStructureUser = async (req, res, next) => {

    // set id from request params
    const id = parseInt(req.params.id);

    // set values from request body
    const {id_structure, id_user} = req.body;

    // create a structure_user with the model
    const structure_user = new StructureUser(id_structure, id_user)

    // build SQL query : update all columns and returns all columns
    const query =
        "UPDATE structures_users SET id_structure=$1, id_user=$2, id=$3 WHERE id=$3 RETURNING *;";
    const value = [structure_user.id_structure, structure_user.id_user, id];

    try {

        // send query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Structure's user does not exist");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "Structure's user updated successfully ",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// delete a structure_user by its id
const deleteStructureUser = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);
    const value = [id];

    // build SQL query : delete tuple where id = id in request
    const query = "DELETE FROM structures_users WHERE id=$1;";

    try {

        // send the query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Structure's user does not exist");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Structure's user deleted successfully"
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// export functions
module.exports = {
    getStructuresUsers,
    createStructureUser,
    getStructureUserById,
    getStructureUserByUserId,
    updateStructureUser,
    deleteStructureUser
};
