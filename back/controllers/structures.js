const {pool} = require("../config");
const Structure = require('../models/structures')

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

    const query =
        "INSERT INTO structures (id_franchise, name, address, phone, isactive, subscriptions, group_lessons, private_coaching, workforce, plannings, equipments, advertising, snacks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;";
    const values = [structure.id_franchise, structure.name, structure.address, structure.phone,
        structure.isactive, structure.subscriptions, structure.group_lessons, structure.private_coaching,
        structure.workforce, structure.plannings, structure.equipments, structure.advertising, structure.snacks];
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

    const query =
        "UPDATE structures SET id_franchise=$1, name=$2, address=$3, phone=$4, isactive=$5, subscriptions=$6, group_lessons=$7, private_coaching=$8, workforce=$9, plannings=$10, equipments=$11, advertising=$12, snacks=$13, id=$14 WHERE id=$14 RETURNING *;";
    const value = [structure.id_franchise, structure.name, structure.address, structure.phone, structure.isactive,
        structure.subscriptions, structure.group_lessons, structure.private_coaching, structure.workforce,
        structure.plannings, structure.equipments, structure.advertising, structure.snacks, id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("Structure does not exist");

        return res.status(200).json({
            status: 200,
            message: "Structure updated successfully ",
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
