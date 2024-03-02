const jwt = require('jsonwebtoken');
const user = require("../models/user-model");


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            message: "Token is not valid"
        })
    }
    console.log("token is : " + token);
    
    const jwtToken = token.replace("Bearer ", "").trim();
    
    // const jwtToken = token.trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const userData = await user.findOne({email:isVerified.email}).select({password:0,});

        console.log("uaer"+userData);
        req.user=userData;
        req.token=token;
        req.userId=userData._id;
        
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({
            message: "Token is not valid"
        })
    }

}

module.exports = authMiddleware;