// import pool object from pg module exported in config.js
const {pool} = require("../config");

// import bcrypt module, library to help to hash passwords.
const bcrypt = require("bcrypt");

// import jwt package
const jwt = require('jsonwebtoken');

// function to authenticate an existing user with its email and its password
const login = async (req, res, next) => {

    // get email from request body
    const email = req.body.email;

    // build SQL query to find the user with its email
    const query = "SELECT * FROM users WHERE email=$1;";
    const value = [email];

    try {

        // send the query
        const data = await pool.query(query, value);

        // if no result send 401
        if (data.rowCount === 0) return res.status(401).send("User or password invalid");

        else {

            // if the user exists sets it in the user constant
            const user = data.rows[0]

            // compares the password from the request with the password from the database, with bcrypt library
            bcrypt.compare(req.body.passphrase, user.passphrase)

                .then(valid => {
                    // if the result is false
                    if (!valid) {

                        // sends an error message to client with code 401
                        res.status(401).json({message: 'User or password invalid'})
                    } else {

                        // if the password is correct, create a key token to the user and create an access token
                        // in the token payload set the user ID and sets expiration time to 30m (to change to 10mn when
                        // refresh token will be implemented) todo : sets the secret key in a .env file and implement
                        // todo : refresh token
                        user.token = jwt.sign(
                            {userId: user.id},
                            "eyJ1c2VySWQiOjExLCJpYXQiOjE2NjM5NDEwOTk",
                            {expiresIn: '10s'}
                        )

                        // delete the key value from user constant
                        delete user.passphrase

                        // return the user
                        return res.status(200).json({
                            status: 200,
                            message: "User:",
                            data: user
                        })
                    }
                }) // if there is an error of communication between backend and database
                .catch(error => res.status(500).json({error}))
        }
        // catch errors
    } catch (error) {
        return next(error);
    }
};

// export function
module.exports = {login};