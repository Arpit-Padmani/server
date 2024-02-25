const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const salutRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salutRound);

        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
})
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
            userId: this._id.toString(),
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

const User = new mongoose.model("User", userSchema);
module.exports = User;