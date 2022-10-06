// import jwt package
const jwt = require('jsonwebtoken');

// export a function to verify the token
module.exports = (req, res, next) => {
    try {
        // get the token from the property authorization of the header's request
        const token = req.headers.authorization.split(' ')[1];
        // uses verify method from jwt to decode the token with the key
        // if false an error will occur
        const decodedToken = jwt.verify(token, 'eyJ1c2VySWQiOjExLCJpYXQiOjE2NjM5NDEwOTk')
        // gets the user's id and gave it to the auth property of the request
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        console.log('authorized')
        // use next to uses the next middleware
        next();
    } catch(error) {
        res.status(401).json({error})
        console.log('Unauthorized')
    }
}