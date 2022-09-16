const { pool } = require("../config");

const getStructures = async (req, res, next) => {
    try {
        const data = await pool.query(
            "SELECT * FROM structures ORDER BY id ASC;"
        );

        if (data.rowCount === 0)
            return res.status(404).send("No structure exists");

        return res.status(200).json({
            status: 200,
            message: "All structures:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const createStructure = async (req, res, next) => {
    const { id_franchise, name, address, phone, isActive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks } = req.body;
    const query =
        "INSERT INTO structures (id_franchise, name, address, phone, isActive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;";
    const values = [id_franchise, name, address, phone, isActive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks];
    try {
        const data = await pool.query(query, values);

        return res.status(201).json({
            status: 201,
            message: "Structure added successfully",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const getStructureById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM structures WHERE id=$1;";
    const value = [id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("No franchisee exists");

        return res.status(200).json({
            status: 200,
            message: "Franchisee:",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

const updateStructure = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const {name, address, phone, default_modules, isActive} = req.body;

    const query =
        "UPDATE structures SET name=$1, address=$2, phone=$3, default_modules=$4, isActive=$5, id=$6 WHERE id=$6 RETURNING *;";
    const value = [name, address, phone, default_modules, isActive, id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("Franchisee does not exist");

        return res.status(200).json({
            status: 200,
            message: "Franchisee updated successfully ",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

const deleteStructure = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const value = [id];
    const query = "DELETE FROM structures WHERE id=$1;";

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("Franchisee does not exist");

        return res.status(200).json({
            status:200,
            message: "Franchisee deleted successfully"
        })
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getStructures,
    createStructure,
    getStructureById,
    updateStructure,
    deleteStructure
};
