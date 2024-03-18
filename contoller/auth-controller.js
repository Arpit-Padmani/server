const renter = require("../models/renter-model");
const owner = require("../models/owner-model");
const bcrypt = require("bcryptjs");
const Renter = require("../models/renter-model");
const Owner = require("../models/owner-model");


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

        if (renterExists || ownerExists) {
            return res.status(400)
                .json(
                    { message: "Email is already exists" }
                );
        }
        let userCreated;

        if (userType === 'renter') {
            userCreated = await renter.create({
                name,
                email,
                password,
                gender,
                birthdate,
                state,
                userType
            });
        } else if (userType === 'owner') {
            userCreated = await owner.create({
                name,
                email,
                password,
                gender,
                birthdate,
                state,
                userType
            });
        } else {
            return res.status(500).send("User type is not valid. Error in storing data.");
        }

        res.status(201).json({
            message: "Registration successfully",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            userType: userCreated.userType.toString(),
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
        const ownerExist = await owner.findOne({ email });

        if (!renterExist && !ownerExist) {
            res.status(400).json({ message: "Invalid Credentials .. " });
        }

        // console.log(renterExist);
        // console.log(ownerExist);
        let userExist;
        let passwordValid;
        if (renterExist) {
            userExist=renterExist;
            passwordValid = await renterExist.comparePassword(password);
            
        } else if (ownerExist) {
            userExist=ownerExist
            passwordValid = await ownerExist.comparePassword(password);
            
        }else{
            res.status(403).json({ message: "Invalid email " });
        }

        // const passwordValid = await bcrypt.compare(password,renterExist.password);
        // const renterType = renter.userType;

        if (passwordValid) {
            res.status(200).json({
                message: "Login successfully",
                token: await userExist.generateToken(),
                renterId: userExist._id.toString(),
                renterType: userExist.userType.toString(),
            });
            // res.json({ email, userType });
        } else {
            // next(error);
            res.status(401).json({ message: "Invalid email or password " });
        }
        return;


    } catch (error) {
        console.log("error aya he login me " + error);
    }
}

const userdata = async (req, res) => {
    try {
        const userType = req.user.userType;
        let user;
        if (userType === 'renter') {
            user = await Renter.findOne({ _id: req.user._id }).select({ password: 0 });
            // console.log("login thai gyu");
        } else if (userType === 'owner') {
            user = await Owner.findOne({ _id: req.user._id }).select({ password: 0 });
            // console.log("login thai gyu");

        } else {
            return res.status(400).json({ message: "Invalid user type" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found", });
        }

        // console.log(user);

        res.status(200).json({ userData: user });
    } catch (error) {
        console.log("Error from user route ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updatetUserById = async (req, res) => {
    try {

        const id = req.params.id;
        const updatedUserData = req.body;
        // console.log(updatedUserData);
        const renterExist = await renter.findOne({ _id:id });
        const ownerExist = await owner.findOne({ _id:id });

        if (renterExist) {
            const updatedData = await Renter.updateOne(
                { _id: id },
                { $set: updatedUserData });
    
            res.status(201).json({ updatedData, message: "update successfully" });
        } 
        else if (ownerExist) {
            const updatedData = await Owner.updateOne(
            { _id: id },
            { $set: updatedUserData });


        res.status(201).json({ updatedData, message: "update successfully" });
            
        }else{
            // console.log("error");
            res.status(403).json({ message: "Error from upadting data" });
        }

    } catch (error) {
        console.log("Error From updating data... " + error);
    }
}

module.exports = { home, register, login, userdata, updatetUserById };