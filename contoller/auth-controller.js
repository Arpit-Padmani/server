const renter = require("../models/renter-model");
const owner = require("../models/owner-model");
const bcrypt = require("bcryptjs");


const home = async (req, res) => {
    try {
        res.status(200).send("welcome to express server ")
    } catch (error) {
        console.log("any error is occured :- " + error)
    }
}

const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { name, email, password, gender, birthdate, state, userType } = req.body;

        const ownerExists = await owner.findOne({ email: email });
        const renterExists = await renter.findOne({ email: email });

        if (renterExists && ownerExists) {
            return res.status(400)
                .json(
                    { message: "Email is already exists" }
                );
        }

        if (userType == 'renter') {
            const renterCreated = await renter.create({
                name,
                email,
                password,
                gender,
                birthdate,
                state,
                userType
            });
        } else if (userType == 'owner') {
            const ownerCreated = await owner.create({
                name,
                email,
                password,
                gender,
                birthdate,
                state,
                userType
            });

        }
        else{
            res.status(505).send("user type is not valid error in store data" );
        }



        res.status(201).json({
            message: "Registration successfully",
            token: await renterCreated.generateToken(),
            renterId: renterCreated._id.toString(),
            renterType: renterCreated.userType.toString(),
        });
    } catch (error) {
        // console.log(error);
        res.status(404).send("pgae not found " + error);
        // next(error);
        // console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const renterExist = await renter.findOne({ email });

        if (!renterExist) {
            res.status(400).json({ message: "Invalid Credentials .. " });
        }

        // console.log(renterExist);

        // const passwordValid = await bcrypt.compare(password,renterExist.password);
        const passwordValid = await renterExist.comparePassword(password);
        // const renterType = renter.userType;

        if (passwordValid) {
            res.status(200).json({
                message: "Login successfully",
                token: await renterExist.generateToken(),
                renterId: renterExist._id.toString(),
                renterType: renterExist.userType.toString(),
            });
            // res.json({ email, userType });
        } else {
            next(error);
            // res.status(401).json({ message: "Invalid email or password " });
        }
        return;


    } catch (error) {
        console.log("error aya he login me " + error);
    }
}

const userdata = async (req, res) => {
    try {

        const userData = req.user;
        // console.log("user"+userData);

        res.status(201).json({ userData });


    } catch (error) {
        console.log("error from user route" + error);
    }
}

const updatetUserById = async (req, res) => {
    try {

        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await user.updateOne(
            { _id: id },
            { $set: updatedUserData });


        res.status(201).json({ updatedData, message: "update successfully" });


    } catch (error) {
        console.log("error from user route" + error);
    }
}

module.exports = { home, register, login, userdata, updatetUserById };