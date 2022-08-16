import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema } from "./RegistrationSchema";
import { useTranslation } from "react-i18next";
import "./registration.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const APIENDPOINT = "http://127.0.0.1:8000/";

function RegistrationStaffMultiStep() {
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { loginUser } = useContext(AuthContext);
  let onSubmit = async (values, actions) => {
    let res = await fetch(`${APIENDPOINT}users/staff-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        staff_profile: {
          first_name: values.firstName,
          middle_names: values.middleNames,
          last_name: values.lastName,
          professional_number: values.professionalNumber,
          telephone_numbers: [
            {
              telephone_number: values.telephoneNumber,
            },
          ],
          staff_role: values.staffRole,
        },
      }),
    });

    if (res.ok) {
      loginUser(values);
      navigate("/register/provider")
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
      firstName: "",
      middleNames: "",
      lastName: "",
      telephoneNumber: "",
      professionalNumber: "",
      staffRole: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit,
  });

  return (
    <div className="registration-page">
    <div className="form-sidebar">
        
        <span className="form-header"> {t("Register")}</span>
        </div>
      <div className="user-form-container">
        <form className="user-form" type="submit" onSubmit={handleSubmit}>
          <label> {t("first_name")}</label>

          <input
            type="text"
            name="firstName"
            placeholder={t("enter_your_first_name")}
            className={
              errors.firstName && touched.firstName
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName && (
            <p className="error">{errors.firstName}</p>
          )}

          <label> {t("middle_names")}</label>

          <input
            type="text"
            name="middleNames"
            placeholder={t("enter_your_middle_names")}
            className={
              errors.middleNames && touched.middleNames
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.middleNames}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.middleNames && touched.middleNames && (
            <p className="error">{errors.middleNames}</p>
          )}


          <label>{t("last_name")}</label>
          <input
            type="text"
            name="lastName"
            placeholder={t("enter_your_last_name")}
            className={
              errors.lastName && touched.lastName
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && touched.lastName && (
            <p className="error">{errors.lastName}</p>
          )}

          <label>{t("professional_number")}</label>
          <input
            type="text"
            name="professionalNumber"
            placeholder={t("enter_your_professional_number")}
            className={
              errors.professionalNumber && touched.professionalNumber
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.professionalNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.professionalNumber && touched.professionalNumber && (
            <p className="error">{errors.professionalNumber}</p>
          )}

          <label>{t("staff_role")}</label>
          <Select
            value={values.staffRole}
            name="staffRole"
            onChange={handleChange}
            displayEmpty
            className="form-fields"
          >
            <MenuItem value={"DR"}>{t("doctor")}</MenuItem>
            <MenuItem value={"NR"}>{t("nurse")}</MenuItem>
            <MenuItem value={"MG"}>{t("manager")}</MenuItem>
            <MenuItem value={"AD"}>{t("admin")}</MenuItem>
            <MenuItem value={"PC"}>{t("practitioner")}</MenuItem>

          </Select>


          <label>{t("telephone_number")}</label>
          <input
            type="text"
            name="telephoneNumber"
            placeholder={t("enter_your_telephone_number")}
            className={
              errors.telephoneNumber && touched.telephoneNumber
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.telephoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.telephoneNumber && touched.telephoneNumber && (
            <p className="error">{errors.telephoneNumber}</p>
          )}

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

          <input
            className="form-button"
            disabled={isSubmitting}
            type="submit"
            value={t("next")}
          />
        </form>

        <span className="form-text">
          {t("already_have_an_account_?")}

          <Link to="/login" className="form-link">
            {" "}
            {t("login")}{" "}
          </Link>
        </span>
      </div>
    </div>
  );
}

export default RegistrationStaffMultiStep;
