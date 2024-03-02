const user = require("../models/user-model");
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

        const userExists = await user.findOne({ email: email });

        if (userExists) {
            return res.status(400)
                .json(
                    { message: "Email is already exists" }
                );
        }

        const userCreated = await user.create({
            name,
            email,
            password,
            gender,
            birthdate,
            state,
            userType
        });

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
        const userExist = await user.findOne({ email });

        if (!userExist) {
            res.status(400).json({ message: "Invalid Credentials .. " });
        }

        // console.log(userExist);

        // const passwordValid = await bcrypt.compare(password,userExist.password);
        const passwordValid = await userExist.comparePassword(password);
        // const userType = user.userType;

        if (passwordValid) {
            res.status(200).json({
                message: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                userType: userExist.userType.toString(),
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
        const updatedUserData=req.body;
        const updatedData= await user.updateOne(
            { _id : id },
            {$set : updatedUserData});
            

        res.status(201).json({ updatedData,message: "update successfully" });


    } catch (error) {
        console.log("error from user route" + error);
    }
}

module.exports = { home, register, login, userdata, updatetUserById };