const jwt = require('jsonwebtoken');
const Renter = require("../models/renter-model");
const Owner = require('../models/owner-model');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: "Token is not valid"
        });
    }

    const jwtToken = token.replace("Bearer ", "").trim();

    try {
        // console.log('Raw Token:', jwtToken);
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("jwt token"+isVerified);
        
        let userData;
        if (isVerified.userType == 'renter') {
            userData = await Renter.findOne({ email: isVerified.email }).select({ password: 0 });
        } else if (isVerified.userType == 'owner') {
            userData = await Owner.findOne({ email: isVerified.email }).select({ password: 0 });
        }
        // console.log("ftv " + userData);

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
        console.error("Error verifying token:", error);
        return res.status(401).json({
            message: "Token is not valid"
        });
    }
};

module.exports = authMiddleware;
