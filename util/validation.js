const joi = require("joi");

const adminSchema = joi.object({
    email:joi.string().email({tlds:{allow:false}}).required().min(5),
    password:joi.string().required().min(5),
}); 

module.exports = {
    adminSchema
}