const z = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, {
            message: "Email must contain at least 5 characters."
        }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(5, {
            message: "Password must contain at least 5 characters."
        }),
});


const signUpSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(5, {
            message: "Name must contain at least 5 characters."
        }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, {
            message: "Email must contain at least 5 characters."
        }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(5, {
            message: "Password must contain at least 5 characters."
        }),
    gender: z
        .string({ required_error: "Gender is required" })
        .trim()
        .min(3, {
            message: "Gender must contain at least 5 characters."
        }),
    birthdate: z
        .string({ required_error: "Birthdate is required" })
        .trim()
        .min(5, {
            message: "Birthdate must contain at least 5 characters."
        }),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(5, {
            message: "State must contain at least 5 characters."
        }),
    userType: z
        .string({ required_error: "Usertype is required" })
        .trim()
        .min(5, {
            message: "Usertype must contain at least 5 characters."
        }),
});

module.exports = {signUpSchema , loginSchema};
