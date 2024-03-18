const {model, Schema}= require('mongoose');

const CheckoutDetailsSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type : String
    },
    address:{
        type:String
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    numberOfDays:{
        type: String
    },
    carId:{
        type:String
    }
});

const CheckOut = new model("checkout",CheckoutDetailsSchema);
module.exports=CheckOut;