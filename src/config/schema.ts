import joi from "joi";

export const newUser: any = joi.object({
  name: joi
    .string()
    .required()
    .custom((name, res) => {
      if (name.trim() === "") {
        return res.message({ message: "Format name invalid" });
      }
      return name;
    })
    .messages({
      "string.empty": "The name field cannot be empty",
      "any.required": "The name field is mandatory",
    }),

  email: joi.string().required().email().messages({
    "string.email": "E-mail invalid format",
    "string.empty": "The email field cannot be empty",
    "any.required": "The email field is mandatory",
  }),

  password: joi
    .string()
    .required()
    .custom((pass, helpers) => {
      if (pass.trim() === "" || pass.includes(" ")) {
        return helpers.message({ message: "Format password invalid" });
      }
      return pass;
    })
    .messages({
      "string.empty": "The password field cannot be empty",
      "any.required": "The passowrd field is mandatory",
      custom: "Format password invalid",
    }),
});

export const newCar: any = joi.object({
  brand: joi
    .string()
    .required()
    .max(50)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format brand invalid" });
      }
      return name;
    })
    .messages({
      "string.empty": "The brand field cannot be empty",
      "any.required": "The brand field is mandatory",
      "string.max": "The brand field must have a maximum of 50 characters",
      custom: "Format brand invalid",
    }),

  model: joi
    .string()
    .required()
    .max(50)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format model invalid" });
      }
      return name;
    })
    .messages({
      "any.required": "The model field is mandatory",
      "string.empty": "The model field cannot be empty",
      "string.max": "The model field must have a maximum of 50 characteres",
      custom: "Format model invalid",
    }),

  yearcar: joi.number().required().positive().integer().messages({
    "number.base": "Insert number valide in year car",
    "any.required": "The year car field is mandatory",
    "number.positive": "Insert only numbers positives in year car",
    "number.integer": "Insert only numbers integers in year car",
  }),

  collor: joi
    .string()
    .required()
    .max(50)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format collor invalid" });
      }
      return name;
    })
    .messages({
      "any.required": "The collor field is mandatory",
      "string.empty": "The collor field cannot be empty",
      "string.max": "The collor field must habe a maximum of 50 characters",
      custom: "Format collor invalid",
    }),

  price: joi.number().required().integer().positive().messages({
    "number.base": "Insert only numbers in price",
    "number.positive": "Insert only numbers positives in price",
    "number.integer": "Insert only numbers integers in price",
    "any.required": "The price field is mandatory",
  }),
});
