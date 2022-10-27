// import jwt package
const jwt = require('jsonwebtoken');
const {pool} = require("../config");

// export a function to verify the token
module.exports = async (req, res, next) => {
    try {
        // get the token from the property authorization of the header's request
        const token = req.headers.authorization.split(' ')[1];

        // uses verify method from jwt to decode the token with the key
        // if false an error will occur
        const decodedToken = jwt.verify(token, 'eyJ1c2VySWQiOjExLCJpYXQiOjE2NjM5NDEwOTk')

        // gets the user's id and gave it to the auth property of the request
        const userId = decodedToken.userId;

        // build query to find user with id in decoded token
        const query = "SELECT * FROM users WHERE id=$1;";
        const value = [userId];
        const data = await pool.query(query, value);

        // if there is no user return 401
        if (data.rowCount === 0) return res.status(401).send("User or password invalid");

        // else calls next
        console.log('authorized')
        next();
    } catch(error) {
        res.status(401).json({error})
        console.log('Unauthorized')
    }
}