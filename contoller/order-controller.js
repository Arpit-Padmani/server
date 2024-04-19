const Renter = require("../models/renter-model");
const Owner = require("../models/owner-model");
const Payment = require("../models/payment-model");
const CarDetail = require("../models/carDetails-model");

const  findByUserId = async (req, res) => {
    try {
        const userData = req.body;
        // console.log(userData);
        const userId = userData._id;

        const dataExists = await Payment.find({ userId });
        // console.log(dataExists);

        res.status(201).json({ dataExists });
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "error in order file" });
    }
}

const findCarDetailBYCarId = async (req,res)=>{
    try {
        const { carIds } = req.body;
        const cars = await CarDetail.find({ _id: { $in: carIds } }); 
        res.json({ success: true, cars });
    } catch (error) {
        
        console.log(error);

        res.status(401).json({ message: "error in order file in car detail contoller " });
    }
}

// for Owner to get booked vehical
const findByCarId = async (req,res) =>{
    try {
        const {productIds} = req.body;
        // console.log(productIds);

        const payments = await Payment.find({ carId: { $in: productIds } }); 

        res.json({ success: true, payments });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "error in order file in car detail contoller " });
    }
}

// for Owner to get booked vehical for get user details
const findUserDetails = async (req, res) => {
    try {
        const { renterIds } = req.body;
        // console.log(renterIds);

        const userDetail = await Renter.find({ _id: { $in: renterIds } });
        // console.log(userDetail);

        res.json({ success: true, userDetail });
    } catch (error) {
        console.error("Error in find user details", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

module.exports = {findByUserId , findCarDetailBYCarId , findByCarId , findUserDetails};