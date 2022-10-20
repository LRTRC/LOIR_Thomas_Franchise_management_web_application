const {pool} = require("../config");

const getFranchisees = async (req, res, next) => {
    try {
        const data = await pool.query(
            "SELECT * FROM franchisees ORDER BY id ASC;"
        );

        if (data.rowCount === 0)
            return res.status(404).send("No franchisee exists");

        return res.status(200).json({
            status: 200,
            message: "All franchisees:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const createFranchisee = async (req, res, next) => {
    const {name, address, phone, default_modules, isactive} = req.body;
    const query =
        "INSERT INTO franchisees (name, address, phone, default_modules, isactive)  VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [name, address, phone, default_modules, isactive];
    try {
        const data = await pool.query(query, values);

        return res.status(201).json({
            status: 201,
            message: "Franchisee added successfully",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const getFranchiseeById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM franchisees WHERE id=$1;";
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

const updateFranchisee = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const {name, address, phone, default_modules, isactive} = req.body;

    const query =
        "UPDATE franchisees SET name=$1, address=$2, phone=$3, default_modules=$4, isactive=$5, id=$6 WHERE id=$6 RETURNING *;";
    const value = [name, address, phone, default_modules, isactive, id];

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

const deleteFranchisee = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const value = [id];
    const query = "DELETE FROM franchisees WHERE id=$1;";

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("Franchisee does not exist");

        return res.status(200).json({
            status: 200,
            message: "Franchisee deleted successfully"
        })
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getFranchisees,
    createFranchisee,
    getFranchiseeById,
    updateFranchisee,
    deleteFranchisee
};
