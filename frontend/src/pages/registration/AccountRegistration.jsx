import React, { useState, useContext } from "react";
import { registrationSchema } from "./RegistrationSchema";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { accountFormSchema } from "./AccountFormSchema";

import APIENDPOINT from "../../api/apiEndpoint.jsx";


function AccountRegistration() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { loginUser, logoutUser } = useContext(AuthContext);

  const [emailSubmited, setemailSubmited] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  let onSubmit = async (values, actions) => {
    console.log("submitted");

    let res = await fetch(`${APIENDPOINT}users/account-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (res.status === 200) {
      loginUser(values);
      
    } else {
      logoutUser();
    }
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: accountFormSchema,
    onSubmit,
  });

  const submitEmail = async () => {
    setemailSubmited(true);

    let response = await fetch(`${APIENDPOINT}users/account-status/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      console.dir(response);
      setEmailExist((prev) => (prev = true));
    }
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      // throw new Error(message);
    }
  };

  return (
    <>
      <div className="user-form-container">
        <form className="user-form" type="submit" onSubmit={handleSubmit}>
          <label> {t("email")}</label>
          <input
            className={
              errors.email && touched.email
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name="email"
            placeholder={t("enter_your_email")}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          {emailSubmited ? (
            <>
              <label> {t("password")}</label>
              <input
                type="password"
                placeholder={t("enter_password")}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "input-error form-fields"
                    : "form-fields"
                }
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
              
                <>
                  <label> {t("confirm_password")}</label>
                  <input
                    className={
                      errors.email && touched.email
                        ? "input-error form-fields"
                        : "form-fields"
                    }
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder={t("renter_your_password")}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </>

              <input
                className="form-button"
                disabled={isSubmitting}
                type="submit"
                value={t("Next")}
              />
            </>
          ) : (
            <input
              className="form-button"
              disabled={isSubmitting}
              type="button"
              onClick={submitEmail}
              value={t("Next")}
            />
          )}
        </form>
      </div>
    </>
  );
}

export default AccountRegistration;
