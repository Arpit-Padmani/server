const express = require('express');
const router = express.Router();
const forgotPassword = require('../contoller/forgotPassword-controller');

router
    .route("/forgotPassword")
    .post( forgotPassword.forgotPassword);

router
    .route("/resetPassword/:id/:token")
    .post(forgotPassword.resetPassword);

module.exports = router;