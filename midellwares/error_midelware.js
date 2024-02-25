const errorMIddelware = (err,req,res,next) => {
    const status = err.status || 400 ;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error From Backend" ;

    return res.status(status).json({
        message,
        extraDetails
    });
};

module.exports = errorMIddelware;