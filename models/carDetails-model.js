const {model, Schema}= require('mongoose');

const CarDetailsSchema = new Schema({
    vehicleName:{
        type: String,
        require : true
    },
    vehicleModel:{
        type: String,
        require : true
    },
    location:{
        type: String,
        require : true
    },
    price:{
        type: Number,
        require : true
    },
    depositPrice:{
        type: Number,
        require : true
    },
    city:{
        type: String,
        require : true
    },
    category:{
        type: String,
        require : true
    },
});

const CarDetail = new model("CarDetail",CarDetailsSchema);
module.exports=CarDetail;