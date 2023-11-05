import joi from "joi";

export const schemaLogin = joi.object({
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
        return res.message({ message: "Format passowrd invalid" });
      }
      return pass;
    })
    .messages({
      "string.empty": "The password field cannot be empty",
      "any.required": "The passowrd field is mandatory",
    }),
});
