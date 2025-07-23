import Joi from "joi";


export const userValidationSchema = Joi.object({
  name : Joi.string().min(3).max(100).required(),
  email : Joi.string().email().required(),
  phone : Joi.string()
  .pattern(/^(?:\+880|00880|0)1[0-9]{9}$/)
  .required()
  .messages({
    "string.pattern.base": "Phone number must be Bangladeshi format (starts with 01 / +8801 / 008801)",
  }),
 password : Joi.string().min(6).required(),
 role : Joi.string().valid("Admin","Customer").required()
})