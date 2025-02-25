import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().min(3, "Name must contain at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  password: yup.string().min(8, "Password must contain at least 8 characters").required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
