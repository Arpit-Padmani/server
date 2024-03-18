const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const renterSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender:{
        type: String,
        require : true
    },
    birthdate:{
        type: String,
        require : true
    },
    state:{
        type: String,
        require : true
    },
    userType:{
        type: String,
        require : true
    },
    phoneNo:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    Occupation:{
        type:String
    }
});

renterSchema.pre('save', async function (next) {
    const renter = this;
    if (!renter.isModified("password")) {
        next();
    }
    try {
        const salutRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(renter.password, salutRound);

        renter.password = hashPassword;
    } catch (error) {
        next("renter model"+error);
    }
})
renterSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}
renterSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
            renterId: this._id.toString(),
            email: this.email,
            userType : this.userType
        },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn:"30d",
         });
    } catch (error) {
        console.log(error);
    }
};

const Renter = new mongoose.model("Renter", renterSchema);
module.exports = Renter;