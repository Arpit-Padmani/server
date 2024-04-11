const jwt = require('jsonwebtoken');
const Renter = require("../models/renter-model");
const Owner = require('../models/owner-model');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    // console.log("Received Token:", token);
    if (!token) {
        return res.status(401).json({
            message: "Token is not provided"
        });
    }

    const jwtToken = token.replace("Bearer ", "").trim();
    // console.log('Extracted Token:', jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        // console.log("Decoded Token:", isVerified);

        let userData;
        if (isVerified.userType == 'renter') {
            userData = await Renter.findOne({ email: isVerified.email }).select({ password: 0 });
        } else if (isVerified.userType == 'owner') {
            userData = await Owner.findOne({ email: isVerified.email }).select({ password: 0 });
        }
        // console.log("User Data:", userData);

        if (!userData) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        let errorMessage = "Token is not valid";
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Token has expired";
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = "Invalid token";
        }
        return res.status(401).json({ message: errorMessage });
    }
};

module.exports = authMiddleware;
