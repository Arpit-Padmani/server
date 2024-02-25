const {model, Schema}= require('mongoose');

const contactSchema = new Schema({
    firstName:{
        type: String,
        require : true
    },
    lastName:{
        type: String,
        require : true
    },
    email:{
        type: String,
        require : true
    },
    message:{
        type: String,
        require : true
    },
});

const Contact = new model("Contact",contactSchema);
module.exports=Contact;