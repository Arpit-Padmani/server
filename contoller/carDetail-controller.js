const CarDetail = require("../models/carDetails-model");

const carDetail = async (req, res) => {
    try {
        const response = req.body;
        await CarDetail.create(response);
        res.status(200).json({ message: "message send successfully " });
    } catch (error) {
        next(error);
        res.status(401).json({ message: "message not delivered " });
    }
}

module.exports = carDetail;