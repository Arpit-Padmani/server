const express = require('express');
const router = express.Router();
const authcontrollers = require('../contoller/auth-controller');
const validate = require('../midellwares/validate_midelware');
const {signUpSchema , loginSchema} = require('../validators/auth-validator');

router.route("/").get(authcontrollers.home);

router
    .route("/register")
    .post(validate(signUpSchema), authcontrollers.register);
    
router
    .route("/login")
    .post(validate(loginSchema),authcontrollers.login);



module.exports = router;