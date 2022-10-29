// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import Structure model
const Structure = require('../models/structures')


// get all structures
const getStructures = async (req, res, next) => {
    try {
        // build SQL query : select all columns from structures table
        const data = await pool.query(
            "SELECT * FROM structures ORDER BY id ASC;"
        );

        //if no results returns 404
        if (data.rowCount === 0)
            return res.status(404).send("No structure exists");

        // else returns result
        return res.status(200).json({
            status: 200,
            message: "All structures:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};


// create a single new structure
const createStructure = async (req, res, next) => {

    // get values from request body
    const {
        id_franchise,
        name,
        address,
        phone,
        isactive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks
    } = req.body;

    // Sets new structure from the model
    const structure = new Structure(id_franchise,
        name,
        address,
        phone,
        isactive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks)

    // build SQL query
    const query =
        "INSERT INTO structures (id_franchise, name, address, phone, isactive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;";
    const values = [structure.id_franchise, structure.name, structure.address, structure.phone,
        structure.isactive, structure.subscriptions, structure.group_lessons, structure.private_coaching,
        structure.workforce, structure.plannings, structure.equipments, structure.advertising, structure.snacks];
    try {

        // send the query
        const data = await pool.query(query, values);

        // returns results
        return res.status(201).json({
            status: 201,
            message: "Structure added successfully",
            data: data.rows
        });
        // or catch error
    } catch (error) {
        return next(error);
    }
};

// get a structure by ID
const getStructureById = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);

    // build SQL query, get all columns from the tuple in table structures where id = id from request
    const query = "SELECT * FROM structures WHERE id=$1;";
    const value = [id];

    try {

        // send the query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("No structure exists");

        // else returns result
        return res.status(200).json({
            status: 200,
            message: "Structure:",
            data: data.rows
        })

        // or error
    } catch (error) {
        return next(error);
    }
};

// update an existing structure, one by one
const updateStructure = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);

    // get values from request body
    const {
        id_franchise,
        name,
        address,
        phone,
        isactive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks
    } = req.body;

    // Sets new structure with the model
    const structure = new Structure(id_franchise,
        name,
        address,
        phone,
        isactive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks)

    // build SQL query : update all columns and returns all columns
    const query =
        "UPDATE structures SET id_franchise=$1, name=$2, address=$3, phone=$4, isactive=$5, subscriptions=$6, group_lessons=$7, private_coaching=$8, workforce=$9, plannings=$10, equipments=$11, advertising=$12, snacks=$13, id=$14 WHERE id=$14 RETURNING *;";
    const value = [structure.id_franchise, structure.name, structure.address, structure.phone, structure.isactive,
        structure.subscriptions, structure.group_lessons, structure.private_coaching, structure.workforce,
        structure.plannings, structure.equipments, structure.advertising, structure.snacks, id];

    try {

        // send query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Structure does not exist");

        // else send results
        return res.status(200).json({
            status: 200,
            message: "Structure updated successfully ",
            data: data.rows
        })

        // or catch error
    } catch (error) {
        return next(error);
    }
};


// delete a user with its id
const deleteStructure = async (req, res, next) => {

    // get id from request params
    const id = parseInt(req.params.id);
    const value = [id];

    // build SQL query : delete tuple from structures here id = id in request
    const query = "DELETE FROM structures WHERE id=$1;";

    try {

        // send query
        const data = await pool.query(query, value);

        // if no result send 404
        if (data.rowCount === 0) return res.status(404).send("Structure does not exist");

        // else return result
        return res.status(200).json({
            status: 200,
            message: "Structure deleted successfully"
        })
        // or catch error
    } catch (error) {
        return next(error);
    }
};

// export functions
module.exports = {
    getStructures,
    createStructure,
    getStructureById,
    updateStructure,
    deleteStructure
};
