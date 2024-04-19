const express = require('express');
const router = express.Router();
const checkout = require('../contoller/checkout-Controller');

router
    .route("/bookingDetail")
    .post(checkout.checkoutAdd);

router
    .route("/getcheckoutDetial/:id")
    .get(checkout.getCheckoutById);

router
    .route("/payment")
    .post(checkout.payment);

router
    .route("/verifyPayment")
    .post(checkout.verifyPayment);

router
    .route("/PaymentSuccessfullEmail")
    .post(checkout.sendPaymentEmail);

router
    .route("/getkey")
    .get(checkout.getKey);

module.exports=router;