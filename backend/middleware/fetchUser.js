var jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const JWT_SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY;
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchUser;