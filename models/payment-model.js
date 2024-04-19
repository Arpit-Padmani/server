const {model, Schema}= require('mongoose');

const paymentSchema = new Schema({
    razorpay_order_id:{
        type:String,
        require:true,
    },
    razorpay_payment_id:{
        type:String,
        require:true,
    },
    razorpay_signature:{
        type:String,
        require:true,
    },
    carId:{
        type:String,
    },
    userId:{
        type:String,
    },
    paymentMethod:{
        type:String,
    },
    amount:{
        type : String,
    }
})

const Payment = new model("Payment",paymentSchema);
module.exports=Payment;