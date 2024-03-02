const {model, Schema}= require('mongoose');

const CarDetailsSchema = new Schema({
    vehicleName:{
        type: String
    },
    vehicleModel:{
        type: String
    },
    photo1: String,
    photo2:String,
    photo3:String,
    location:{
        type: String
    },
    price:{
        type: Number
    },
    depositPrice:{
        type: Number
    },
    city:{
        type: String
    },
    category:{
        type: String
    },
});

const CarDetail = new model("CarDetail",CarDetailsSchema);
module.exports=CarDetail;