require("dotenv").config();

const mongoose = require("mongoose");


const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./router/auth-route');
const connectDB = require('./utils/db');
const errorMIddelware = require("./midellwares/error_midelware");
const contactform = require("./contoller/contact-controller");
const router = require("./router/img-route");
const carDetail = require("./contoller/carDetail-controller");
const Images = require("./models/imgDetail-model");

const corsOption = {
    origin :"http://localhost:3000",
    methods:"GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials : true,
};
app.use(cors(corsOption));


// const multer= require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         return cb(null,"./public/backend/img")
//     },
//     filename : (req,file,cb)=>{
//         return cb(null,`${Date.now()}_${file.originalname}`);
//     }
// });

// const upload= multer({storage: storage});
// require("./models/imgDetail-model");
// const Images = mongoose.model("ImageDetails");

// app.post('/upload',upload.single('photos'), async (req,res)=>{
//     console.log(req.body);
//     console.log(req.body);
//     const imageName = req.file.filename;

//     try {
//         await Images.create({ image: imageName });
//         res.json({ status: "ok" });
//       } catch (error) {
//         // res.json({ status: error });
//         console.log(error);
//       }

// });



app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/form',contactform);
app.use('/api/detail',carDetail)

app.use(errorMIddelware);

connectDB().then(() => {
    app.listen(5000, () => {
        console.log(" server is running ");
    });
});