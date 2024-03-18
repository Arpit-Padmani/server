const CheckOut = require("../models/checkoutDetails-model");

const checkoutAdd = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        const data = await CheckOut.create(response);
        res.status(200).json({ data });
    } catch (error) {
        next(error);
        // res.status(401).json({ message: "message not delivered " });
    }
}

const getCheckoutById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await CheckOut.findById(id);
        console.log(product);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message : "error in display single product" });
    }
}


module.exports = {checkoutAdd , getCheckoutById};