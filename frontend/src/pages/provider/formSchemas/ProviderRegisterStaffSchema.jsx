import * as yup from "yup";
import { setLocale } from 'yup';
import { useTranslation } from "react-i18next";
// import i18n from "./i18n"
import i18next from "i18next";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const requiredError = i18next.t("required_error")
const emailError = i18next.t("email_error")

const strongerPasswordMessage = i18next.t("stronger_password_message")
const passwordMatchError = i18next.t("password_match_error")



export const ProviderRegisterStaffSchema = yup.object().shape({
    
    firstName: yup.string().required(i18next.t("required_error")),
    middleNames: yup.string().required(requiredError),
    lastName: yup.string().required(requiredError),
    professionalNumber: yup.string(),
    telephoneNumber: yup.string().required(requiredError),

    email: yup.string().email(emailError).required(requiredError),
    password: yup
      .string()
      // .min(5)
      // .matches(passwordRules, { message: strongerPasswordMessage })
      .required(requiredError),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], passwordMatchError)
      .required(requiredError),
  });