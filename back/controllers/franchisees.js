// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import Franchisee model
const Franchisee = require('../models/franchisees')

// Get all franchisees
const getFranchisees = async (req, res, next) => {
    try {

        // build SQL query : select all columns from franchisees table
        const data = await pool.query(
            "SELECT * FROM franchisees ORDER BY id ASC;"
        );

        // if no result return 404
        if (data.rowCount === 0)
            return res.status(404).send("No franchisee exists");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "All franchisees:",
            data: data.rows
        });

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// create a franchisee
const createFranchisee = async (req, res, next) => {

    // get values from body request
    const {name, address, phone, default_modules, isactive} = req.body;

    // sets a franchisee with the model
    const franchisee = new Franchisee(name, address, phone, default_modules, isactive)

    // build SQL query : insert all columns except id into franchisees table, returns the franchisee created
    const query =
        "INSERT INTO franchisees (name, address, phone, default_modules, isactive)  VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [franchisee.name, franchisee.address, franchisee.phone, franchisee.default_modules, franchisee.isactive];
    try {

        // send the query
        const data = await pool.query(query, values);

        // if ok send 201
        return res.status(201).json({
            status: 201,
            message: "Franchisee added successfully",
            data: data.rows
        });
        // else return error
    } catch (error) {
        return next(error);
    }
};

// get a franchisee by its id
const getFranchiseeById = async (req, res, next) => {

    // gets id from request params
    const id = parseInt(req.params.id);

    // build SQL query : select all columns from franchisees table where id = id in request
    const query = "SELECT * FROM franchisees WHERE id=$1;";
    const value = [id];

    try {

        // send request
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No franchisee exists");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Franchisee:",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// update a franchisee
const updateFranchisee = async (req, res, next) => {

    // set id from request params
    const id = parseInt(req.params.id);

    // set values from request body
    const {name, address, phone, default_modules, isactive} = req.body;

    // create a franchisee with the model
    const franchisee = new Franchisee(name, address, phone, default_modules, isactive)

    // build SQL query : update all columns and returns all columns
    const query =
        "UPDATE franchisees SET name=$1, address=$2, phone=$3, default_modules=$4, isactive=$5, id=$6 WHERE id=$6 RETURNING *;";
    const value = [franchisee.name, franchisee.address, franchisee.phone, franchisee.default_modules, franchisee.isactive, id];

    try {

        // send query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Franchisee does not exist");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "Franchisee updated successfully ",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// delete a franchisee by its id
const deleteFranchisee = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);
    const value = [id];

    // build SQL query : delete tuple where id = id in request
    const query = "DELETE FROM franchisees WHERE id=$1;";

    try {

        // send the query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Franchisee does not exist");

        // else send result
        return res.status(200).json({
            status: 200,
            message: "Franchisee deleted successfully"
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};

// export functions
module.exports = {
    getFranchisees,
    createFranchisee,
    getFranchiseeById,
    updateFranchisee,
    deleteFranchisee
};
