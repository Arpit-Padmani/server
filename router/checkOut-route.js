const express = require('express');
const router = express.Router();
const checkout = require('../contoller/checkout-Controller');

router
    .route("/bookingDetail")
    .post(checkout.checkoutAdd);

router
    .route("/getcheckoutDetial/:id")
    .get(checkout.getCheckoutById);

module.exports=router;