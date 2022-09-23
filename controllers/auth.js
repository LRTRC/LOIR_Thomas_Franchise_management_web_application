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


// const oldLogin = (req, res, next) => {
//     // uses mongoose method
//     User.findOne({email: req.body.email})
//         // if the promise is solved
//         .then(user => {
//             // if the current user isn't found
//             if (user === null) {
//                 res.status(401).json({message: 'identifiant ou mot de passe incorrecte'})
//             } else {
//                 // if the user is found, uses bcrypt methode to compare
//                 // the hash found in the database and the hash given by the client
//                 bcrypt.compare(req.body.password, user.password)
//                     .then(valid => {
//                         // if the result is false
//                         if (!valid) {
//                             // then sends an error message to client with code 401
//                             res.status(401).json({message: 'identifiant ou mot de passe incorrecte'})
//                         } else {
//                             // if the result is true and the password correct
//                             // sends a code 200 and the user's id and token
//                             // to identify its http requests
//                             res.status(200).json({
//                                 userId: user._id,
//                                 // calls jwt method sign
//                                 // first arg : payload that we want to encode
//                                 // second : key for encoding (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production).
//                                 // third : options
//                                 token: jwt.sign(
//                                     {userId: user._id},
//                                     'RANDOM_TOKEN_SECRET',
//                                     {expiresIn: '24h'}
//                                 )
//                             })
//                         }
//                     })
//                     // if there is an error of communication between backend and database
//                     .catch(error => res.status(500).json({error}))
//             }
//         })
//         .catch(error => res.status(500).json({error}))
// };

module.exports = {login};
