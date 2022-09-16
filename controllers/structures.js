const {pool} = require("../config");

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
    const {
        id_franchise,
        name,
        address,
        phone,
        isActive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks
    } = req.body;
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

        if (data.rowCount === 0) return res.status(404).send("No structure exists");

        return res.status(200).json({
            status: 200,
            message: "Structure:",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

const updateStructure = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const {
        id_franchise,
        name,
        address,
        phone,
        isActive,
        subscriptions,
        group_lessons,
        private_coaching,
        workforce,
        plannings,
        equipments,
        advertising,
        snacks
    } = req.body;

    const query =
        "UPDATE structures SET id_franchise=$1, name=$2, address=$3, phone=$4, isActive=$5, subscriptions=$6, group_lessons=$7, private_coaching=$8, workforce=$9, plannings=$10, equipments=$11, advertising=$12, snacks=$13, id=$14 WHERE id=$14 RETURNING *;";
    const value = [id_franchise, name, address, phone, isActive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks, id];

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

        if (data.rowCount === 0) return res.status(404).send("Structure does not exist");

        return res.status(200).json({
            status: 200,
            message: "Structure deleted successfully"
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
