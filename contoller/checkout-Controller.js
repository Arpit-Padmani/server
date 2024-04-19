const Razorpay = require("razorpay");
const CheckOut = require("../models/checkoutDetails-model");
const crypto = require("crypto");
const Payment = require("../models/payment-model");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

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
        res.status(401).json({ message: "error in display single product" });
    }
}

const instance = new Razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.SECRET
})

const payment = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        }
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(201).json({ order });

    } catch (error) {
        console.log(error);
    }
}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, carId, paymentMethod, amount } = req.body;
    console.log(userId);
    console.log(razorpay_payment_id);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsignature = crypto.createHmac('sha256', process.env.SECRET).update(body).digest('hex');
    const isauth = expectedsignature === razorpay_signature;
    console.log(isauth);
    if (isauth) {
        await Payment.create({
            razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, carId, paymentMethod, amount
        })
        res.redirect(`http://localhost:3000/paymentsuccess`)
    }
    else {
        console.log("error in paymentverification");
        res.status(401).json({ message: "error in  payment method" });
    }
}
const getKey = async (req, res) => {
    try {
        const key = process.env.KEYID;
        res.json({ key });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error in checkout get key' });
    }
};
const sendPaymentEmail = async (req, res) => {
    try {
        const userData = req.body;
        // console.log(userData);
        // console.log(email);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'renteasy312@gmail.com',
                pass: 'sney zhwc gqwo rmvz'
            }
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'arpitpadmani197@gmail.com', // Assuming email is present in userData
            // to: userData.email, // Assuming email is present in userData
            subject: 'Congratulations! Your Dream Ride Awaits: Payment Confirmed for Your RentEasy Car Booking 🚗✨',
            text: `Dear User,

            We're thrilled to inform you that your payment for booking a car with RentEasy has been successfully processed! 🌟 Get ready for an unforgettable journey ahead in your dream ride.
            
            Your booking is confirmed, and we can't wait to see you enjoy the freedom of the open road in style. If you have any questions or need assistance, feel free to reach out to our support team at [Support Email or Phone].
            
            Thank you for choosing RentEasy, where every ride is an adventure!
            
            Happy travels,
            RentEasy Team`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { checkoutAdd, getCheckoutById, payment, verifyPayment, getKey , sendPaymentEmail };