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
    .custom((pass, res) => {
      if (pass.trim() === "") {
        return res.message({ message: "Format password invalid" });
      } else if (pass.includes(" ")) {
        return res.message({ message: "Format password invalid" });
      }
      return pass;
    })
    .messages({
      "string.empty": "The password field cannot be empty",
      "any.required": "The passowrd field is mandatory",
    }),
});
