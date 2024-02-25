const express = require('express');
const router = express.Router();
const carDetail = require('../contoller/carDetail-controller')

router.route("/carDetail").post(carDetail);

module.exports=router;