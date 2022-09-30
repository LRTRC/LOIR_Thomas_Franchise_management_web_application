const {pool} = require("../config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const email = req.body.email;

    const query = "SELECT * FROM users WHERE email=$1;";
    const value = [email];

    try {
        const data = await pool.query(query, value);

        if (data.rowCount === 0) return res.status(401).send("User or password invalid");

        else {
            const user = data.rows[0]
            bcrypt.compare(req.body.passphrase, user.passphrase)
                .then(valid => {
                    // if the result is false
                    if (!valid) {
                        // then sends an error message to client with code 401
                        res.status(401).json({message: 'User or password invalid'})
                    } else {
                        let user = data.rows[0]
                        user.token = jwt.sign(
                            {userId: user.id},
                            "eyJ1c2VySWQiOjExLCJpYXQiOjE2NjM5NDEwOTk",
                            {expiresIn: '12h'}
                        )
                        delete user.passphrase
                        return res.status(200).json({
                            status: 200,
                            message: "User:",
                            data: user
                        })
                    }
                }) // if there is an error of communication between backend and database
                .catch(error => res.status(500).json({error}))
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {login};
