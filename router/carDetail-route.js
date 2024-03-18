const express = require('express');
const router = express.Router();
const carDetail = require('../contoller/carDetail-controller');

router
    .route("/carDetail")
    .post(carDetail.postCarDetail);

router
    .route("/getCarDetails")
    .get(carDetail.getAllPrducts);

router
    .route("/getProduct/ProductById/:id")
    .get(carDetail.getProductById);

router
    .route("/product/update/:id")
    .patch(carDetail.updateProductById);

router
    .route("/product/delete/:id")
    .delete(carDetail.deleteProduct);

router
    .route("/getOwner/OwnerById/:id")
    .get(carDetail.getOwnerById);

module.exports=router;