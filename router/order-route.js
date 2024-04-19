const express = require('express');
const findByUserId = require('../contoller/order-controller');
const router = express.Router();

router
    .route("/findByUserId")
    .post(findByUserId.findByUserId);

router
    .route("/findCarDetailsBYCarId")
    .post(findByUserId.findCarDetailBYCarId);

router
    .route("/findByCarId")
    .post(findByUserId.findByCarId);

router
    .route("/findUserDetails")
    .post(findByUserId.findUserDetails);


module.exports = router;