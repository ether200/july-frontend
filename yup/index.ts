import * as Yup from "yup";

export const LoginSchema = Yup.object({
  identifier: Yup.string()
    .email("Please provide a valid mail")
    .required("Mail is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object({
  username: Yup.string().required("Please enter an username"),
  name: Yup.string()
    .required("Please enter your name!")
    .matches(/^[aA-zZ]+$/, "Name must have only letters and no spaces"),
  lastName: Yup.string()
    .required("Please enter your last name!")
    .matches(/^[aA-zZ]+$/, "Name must have only letters and no spaces"),
  email: Yup.string()
    .email("Please provide a valid mail")
    .required("Mail is required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
  passwordConfirm: Yup.string().test(
    "password-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const AccountSchema = Yup.object({
  name: Yup.string()
    .required("Please enter your name!")
    .matches(/^[aA-zZ]+$/, "Name must have only letters and no spaces"),
  lastName: Yup.string()
    .required("Please enter your last name!")
    .matches(/^[aA-zZ]+$/, "Name must have only letters and no spaces"),
  email: Yup.string()
    .email("Please provide a valid mail")
    .required("Mail is required"),
});

export const AddressSchema = Yup.object({
  title: Yup.string().required("Please enter a title!"),
  address: Yup.string().required("Please enter your address"),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your state"),
  postalCode: Yup.string().required("Please enter your postal code"),
  phone: Yup.string().required("Please enter a phone number"),
});
