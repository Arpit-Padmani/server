const CarDetail = require("../models/carDetails-model");
const multer= require('multer');
const path = require('path');

const storage = multer.diskStorage({
        destination : "./public/backend/img" , 
        filename : (req,file,cb)=>{
            // cb(null,Date.now(+file+originalname))
            cb(null,file.originalname)
        }
    });
    
const upload= multer({storage: storage});

const carDetail = async (req, res) => {
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
    {/* try {
        const response = req.body;
        await CarDetail.create(response);
        res.status(200).json({ message: "message send successfully " });
    } catch (error) {
        next(error);
        res.status(401).json({ message: "message not delivered " });
    } **/}
}

module.exports = carDetail;