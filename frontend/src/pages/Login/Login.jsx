import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./loginSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./login.css";

const APIENDPOINT = "http://127.0.0.1:8000";

function Login() {
  const navigate = useNavigate();
  const notify = () => toast(t("invalid_email_or_password"), 
  {toastId: "customId",
  className: 'black-background',
  bodyClassName: "grow-font-size",
  }
  );

  const { t } = useTranslation();
  const { loginUser, user } = useContext(AuthContext);
  const onSubmit = async (values) => {
    const loginSuccessful = await loginUser(values);

    if (loginSuccessful) {
      navigate("/staff-dashboard");
    } else {
      notify();
    }
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
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
    {user ? navigate("/staff-dashboard"):

    <div className="login-page">
    <div className="form-sidebar">
      <span className="form-header"> {t("login")}</span>
    </div>
     
      <div className="user-form-container">
      <ToastContainer
        position="bottom-center"
        autoClose={50000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl 
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
       style = {{"width": "100%"}}
      />
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

        <input
          className="form-button"
          disabled={isSubmitting}
          type="submit"
          value={t("login")}
        />
      </form>
      <span className="form-text">
        {t("dont_have_an_account")}
        <Link to="/register" className="form-link">
          {" "}{t("register")}{" "}
        </Link>
      </span>
    </div>
    </div>
        
    }
  </>
  );
}

export default Login;
