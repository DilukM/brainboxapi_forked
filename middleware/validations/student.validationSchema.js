import Joi from "joi";

const userTypes = [

  "student",

];
const studentRegistrationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "Pleas Enter Your First Name.",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Pleas Enter Your Last Name.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Pleas Enter Your Email.",
    "string.email": "Invalid Your Email .",
  }),
  mobile: Joi.string()
    .required()
    .regex(
      /^(77|78|71|75|76|72|73|74|79|70|077|078|071|075|076|072|073|074|079|070)[0-9]{7}$/
    )
    .messages({
      "string.empty": "Pleas Enter Your Mobile Number.",
      "string.pattern.base": "Invalid Sri Lanka Number.",
    }),
  grade: Joi.string().required().messages({
    "string.empty": "Pleas Select Grade.",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Pleas Select Gender.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Pleas Enter Your Password.",
    "string.min": "Password should have a minimum length of 8 .",
  }),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Pleas Enter Your Password.",
      "any.only": "Password does not match !.",
    }),
  promoCode: Joi.string().allow("").optional(),

  terms: Joi.boolean().required().valid().messages({
    "boolean.base": "Pleas agree tearms & condtions.",
  }),
  userType: Joi.string()
    .required()
    .valid(...Object.values(userTypes)),
  // paymentReceipt: Joi.string().required().allow(/^image\/(jpeg|jpg|png|gif|webp)$/).messages({
  //     'any.required': 'Pleas Select Payment Receipt.',
  // }),
});

export const studentValidateFormRegistration = (req, res, next) => {
  const { error, value } = studentRegistrationSchema.validate(req.body);
  if (error) {
    return res.json({ error: error.details[0].message });
  } else {
    next();
  }
};

const studentSchemalogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Pleas Enter Your Email.",
    "string.email": "Invalid Your Email .",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Pleas Enter Your Password.",
  }),
});

export const studentValidateFormLogin = (req, res, next) => {

  const { error, value } = studentSchemalogin.validate(req.body.form);
  if (error) {
    return res.status(409).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { studentValidateFormRegistration, studentValidateFormLogin };
