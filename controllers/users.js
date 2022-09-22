const { pool } = require("../config");

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
    const { first_name , last_name , email , phone , role, passphrase } = req.body;
    const query =
        "INSERT INTO users (first_name, last_name, email, phone, role, passphrase)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *;";
    const values = [first_name , last_name , email , phone , role, passphrase];
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
//
// const getFranchiseeById = async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const query = "SELECT * FROM franchisees WHERE id=$1;";
//     const value = [id];
//
//     try {
//         const data = await pool.query(query, value);
//
//         if (data.rowCount === 0) return res.status(404).send("No User exists");
//
//         return res.status(200).json({
//             status: 200,
//             message: "User:",
//             data: data.rows
//         })
//     } catch (error) {
//         return next(error);
//     }
// };
//
// const updateFranchisee = async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const {name, address, phone, default_modules, isActive} = req.body;
//
//     const query =
//         "UPDATE franchisees SET name=$1, address=$2, phone=$3, default_modules=$4, isActive=$5, id=$6 WHERE id=$6 RETURNING *;";
//     const value = [name, address, phone, default_modules, isActive, id];
//
//     try {
//         const data = await pool.query(query, value);
//
//         if (data.rowCount === 0) return res.status(404).send("User does not exist");
//
//         return res.status(200).json({
//             status: 200,
//             message: "User updated successfully ",
//             data: data.rows
//         })
//     } catch (error) {
//         return next(error);
//     }
// };
//
// const deleteFranchisee = async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const value = [id];
//     const query = "DELETE FROM franchisees WHERE id=$1;";
//
//     try {
//         const data = await pool.query(query, value);
//
//         if (data.rowCount === 0) return res.status(404).send("User does not exist");
//
//         return res.status(200).json({
//             status:200,
//             message: "User deleted successfully"
//         })
//     } catch (error) {
//         return next(error);
//     }
// };

module.exports = {
    getUsers,
    createUser,
    // getUserById,
    // updateUser,
    // deleteUser
};
