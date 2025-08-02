require("dotenv").config();

const mongoose = require("mongoose");


const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./router/auth-route');
const passRouter = require('./router/pass-route');
const carDetailRouter = require('./router/carDetail-route');
const checkoutDetailRouter = require('./router/checkOut-route');
const orderRouter = require('./router/order-route');
const connectDB = require('./utils/db');
const errorMIddelware = require("./midellwares/error_midelware");
const contactform = require("./contoller/contact-controller");
const router = require("./router/img-route");
const carDetail = require("./contoller/carDetail-controller");
const Images = require("./models/imgDetail-model");

const corsOption = {
  origin: "http://localhost:3001",
  methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOption));


const path = require('path');

{/**
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        return cb(null,"./public/backend/img")
    },
    filename : (req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`);
    }
});

const upload= multer({storage: storage});
require("./models/imgDetail-model");
const Images = mongoose.model("ImageDetails");

app.post('/upload',upload.single('photos'), async (req,res)=>{
    console.log(req.body);
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await Images.create({ image: imageName });
        res.json({ status: "ok" });
      } catch (error) {
        // res.json({ status: error });
        console.log(error);
      }

});  **/}

const CarDetail = require("./models/carDetails-model");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "./public/backend/img",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// app.post('/api/add-vehicle', (res,req) =>{
//     res.json({ message: 'Car details added successfully'});

//   console.log("object");
// } );
app.post('/api/add-vehicle', upload.fields([{ name: 'photo1' }, { name: 'photo2' }, { name: 'photo3' }]), async (req, res) => {
  console.log("object");
  try {
    const carDetails = JSON.parse(req.body.carDetails);
    // console.log(carDetails);

    carDetails.photo1 = req.files['photo1'][0] ? `/backend/img/${req.files['photo1'][0].filename}` : '';
    carDetails.photo2 = req.files['photo2'][0] ? `/backend/img/${req.files['photo2'][0].filename}` : '';
    carDetails.photo3 = req.files['photo3'][0] ? `/backend/img/${req.files['photo3'][0].filename}` : '';

    const newCar = await CarDetail.create(carDetails);
    res.status(200).json({ message: 'Car details added successfully', car: newCar });
  } catch (error) {
    console.error(error);
    console.error('Error processing /api/add-vehicle:', error);
    res.status(500).json({ message: 'Internal server error Server.js' });
  }
});

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatedCarDetails = JSON.parse(req.body.carDetails);
    console.log(updatedCarDetails);

    // Check if new images are uploaded and update the image paths accordingly
    if (req.files) {
      updatedCarDetails.photo1 = req.files['photo1'][0] ? `/backend/img/${req.files['photo1'][0].filename}` : '';
      updatedCarDetails.photo2 = req.files['photo2'][0] ? `/backend/img/${req.files['photo2'][0].filename}` : '';
      updatedCarDetails.photo3 = req.files['photo3'][0] ? `/backend/img/${req.files['photo3'][0].filename}` : '';
    }

    // Update the car details in the database
    const updatedCar = await CarDetail.findByIdAndUpdate(id, updatedCarDetails, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car detail not found' });
    }

    res.status(200).json({ message: 'Car details updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

app.patch('/api/update-vehical/:id', upload.fields([{ name: 'photo1' }, { name: 'photo2' }, { name: 'photo3' }]), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatedCarDetails = JSON.parse(req.body.carDetails);
    console.log(updatedCarDetails);

    // Check if req.files is defined and contains the expected file fields
    if (!req.files) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Update the image paths if files are uploaded
    if (req.files['photo1'] && req.files['photo1'][0]) {
      updatedCarDetails.photo1 = `/backend/img/${req.files['photo1'][0].filename}`;
    }
    if (req.files['photo2'] && req.files['photo2'][0]) {
      updatedCarDetails.photo2 = `/backend/img/${req.files['photo2'][0].filename}`;
    }
    if (req.files['photo3'] && req.files['photo3'][0]) {
      updatedCarDetails.photo3 = `/backend/img/${req.files['photo3'][0].filename}`;
    }

    // Update the car details in the database
    const updatedCar = await CarDetail.findByIdAndUpdate(id, updatedCarDetails, { new: true });
    console.log(updatedCar);

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car detail not found' });
    }

    res.status(200).json({ message: 'Car details updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.use('/uploads', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/forgot', passRouter);
app.use('/api/form', contactform);
app.use('/api/detail', carDetailRouter);
app.use('/api/checkout', checkoutDetailRouter);
app.use('/api/orders', orderRouter);


app.use(errorMIddelware);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server is running ");
  });
});



const easyinvoice = require('easyinvoice')    