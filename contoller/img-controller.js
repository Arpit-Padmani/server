const multer= require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : 'public/backend/img/',
    filename : (req,file,cb)=>{
        cd(null,file.originalname);
    }
});

const upload= multer({
    storage:storage
})

module.exports ={storage,upload};