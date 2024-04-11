const CarDetail = require("../models/carDetails-model");
const Owner = require("../models/owner-model");
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const storage = multer.diskStorage({
    destination: "./public/backend/img",
    filename: (req, file, cb) => {
        // cb(null,Date.now(+file+originalname))
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

const postCarDetail = async (req, res) => {
    try {
        // Use upload.single() middleware for the image field (e.g., carImage)
        upload.single('photo1')(req, res, async (err) => {
            if (err) {
                // Handle multer error, if any
                return res.status(400).json({ message: "Image upload failed", error: err.message });
            }

            // Assuming other car details are sent in the request body
            const carDetails = req.body;

            // If a file is uploaded, add its path to the carDetails
            if (req.file) {
                carDetails.imagePath = path.join('/backend/img', req.file.filename);
            }

            // Save car details to the database
            await CarDetail.create(carDetails);

            res.status(200).json({ message: "Car details and image uploaded successfully" });
        });
    } catch (error) {
        // Handle other errors
        next(error);
        res.status(401).json({ message: "Car details not saved" });
    }
}
const getAllPrducts = async (req, res) => {
    try {
        const allProducts = await CarDetail.find().lean().exec();
        res.json(allProducts);
        // console.log(allProducts);
    } catch (error) {
        console.log(error);
        res.status(401).json({ data: error });
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await CarDetail.findById(id);
        console.log(product);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message : "error in display single product" });
    }
}

const updateProductById = async (req, res) => {
    try {

        const id = req.params.id;
        console.log(id);
        const updatedUserData = req.body;
        console.log(updatedUserData);
        const ProductExist = await CarDetail.findOne({ _id:id });

        if (ProductExist) {
            const updatedData = await CarDetail.updateOne(
                { _id: id },
                { $set: updatedUserData });
    
            res.status(201).json({ updatedData, message: "update car detail successfully" });
        }else{
            console.log("error");
            res.status(403).json({ message: "Error from upadting data in car detail" });
        }

    } catch (error) {
        console.log("Error From updating car detail data...  " + error);
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        await CarDetail.findByIdAndDelete(id);

        res.status(201).json({  message: "delete car detail successfully" });
    } catch (error) {
        console.log("Error From deleting car detail data...  " + error);
    }
}

// Assuming this is your controller function in 'carDetail-controller.js'
const getOwnerById = async (req, res) => {
    try {
        const userId = req.params.id; // Extract the 'userId' parameter from request params
        const validUserId = mongoose.Types.ObjectId.isValid(userId); // Check if userId is a valid ObjectId

        if (!validUserId) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        const owner = await Owner.findById(userId); // Use userId directly (assuming it's an ObjectId)

        if (owner) {
            res.json(owner);
        } else {
            res.status(404).json({ error: 'Owner not found' });
        }
    } catch (err) {
        console.error('Error fetching owner details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { postCarDetail, getAllPrducts, getProductById , updateProductById ,deleteProduct , getOwnerById};