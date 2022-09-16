const {pool} = require("../config");

const getFranchisees = async (req, res, next) => {
    try {
        const data = await pool.query(
            "SELECT * FROM franchisees ORDER BY id ASC;"
        );

        if (data.rowCount === 0)
            return res.status(404).send("No article exists");

        return res.status(200).json({
            status: 200,
            message: "All articles:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const createFranchisee = async (req, res, next) => {
    const { name, address, phone, default_modules, isActive } = req.body;
    const query =
        "INSERT INTO franchisees (name, address, phone, default_modules, isActive)  VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [name, address, phone, default_modules, isActive];
    try{
        const data = await pool.query(query, values);

        return res.status(201).json({
            status:201,
            message: "Franchisee added successfully",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};

const getFranchiseeById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM article WHERE id=$1;";
    const value = [id];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(404).send("No franchisee exists");

        return res.status(200).json({
            status:200,
            message: "Franchisee:",
            data: data.rows
        })
    } catch (error) {
        return next(error);
    }
};

// const updateArticle = async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const { title, article} = req.body;
//
//     const query =
//         "UPDATE article SET title=$1, article=$2 WHERE id=$3 RETURNING *;";
//     const value = [title, article, id];
//
//     try {
//         const data = await pool.query(query, value);
//
//         if (data.rowCount == 0) return res.status(404).send("Article does not exist");
//
//         return res.status(200).json({
//             status:200,
//             message: "Article updated successfully ",
//             data: data.rows
//         })
//     } catch (error) {
//         return next(error);
//     }
// };
//
// const deleteArticle = async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const value = [id];
//     const query = "DELETE FROM article WHERE id=$1;";
//
//     try {
//         const data = await pool.query(query, value);
//
//         if (data.rowCount == 0) return res.status(404).send("Article does not exist");
//
//         return res.status(200).json({
//             status:200,
//             message: "Article deleted successfully"
//         })
//     } catch (error) {
//         return next(error);
//     }
// };

module.exports = {
    getFranchisees,
    createFranchisee,
    getFranchiseeById,
    // updateFranchisee,
    // deleteFranchisee
};
