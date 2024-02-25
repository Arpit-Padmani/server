const express = require('express');
const { upload } = require('../contoller/img-controller');
const router = express.Router();

router.post("/img",upload.single(''));

module.exports=router;