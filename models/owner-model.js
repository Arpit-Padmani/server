const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ownerSchema = new mongoose.Schema({
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

ownerSchema.pre('save', async function (next) {
    const owner = this;
    if (!owner.isModified("password")) {
        next();
    }
    try {
        const salutRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(owner.password, salutRound);

        owner.password = hashPassword;
    } catch (error) {
        next("owner model"+error);
    }
})
ownerSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}
ownerSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
            ownerId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn:"30d",
         });
    } catch (error) {
        console.log(error);
    }
};

const Owner = new mongoose.model("Owner", ownerSchema);
module.exports = Owner;