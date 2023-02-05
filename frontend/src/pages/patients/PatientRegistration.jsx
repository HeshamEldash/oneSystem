import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import APIENDPOINT from "../../api/apiEndpoint.jsx";

function PatientRegistration() {
  const [startDate, setStartDate] = useState(new Date());

  const notify = (msg) =>
    toast(t(msg), {
      toastId: "customId",
      className: "black-background",
      bodyClassName: "grow-font-size",
    });
  const navigate = useNavigate();
  const { t } = useTranslation();

  let onSubmit = async (values, actions) => {
    let res = await fetch(`${APIENDPOINT}/users/patient-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        patient_profile: {
          first_name: values.firstName,
          middle_names: values.middleNames,
          last_name: values.lastName,
          date_of_birth: startDate.toISOString().split("T")[0],
          telephone_numbers: [
            {
              telephone_number: values.telephoneNumber,
            },
          ],
          address: {
            unit_number: values.unit_number,
            first_line: values.firstline,
            second_line: values.second_line,
            city: values.city,
            governorate: values.governorate,
          },
        },
      }),
    });
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
      email: "",
      password: "",
      confirmPassword: "",
      unit_number: "",
      first_line: "",
      second_line: "",
      city: "",
      governorate: "",
    },
    onSubmit,
  });

  return (
    <div className="registration-page">
      <div className="form-sidebar">
        <span className="form-header"> {t("Register")}</span>
      </div>
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
          {/* {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )} */}

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
          {/* {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )} */}

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
          {/* {errors.lastName && touched.lastName && (
            <p className="error">{errors.lastName}</p>
          )} */}

          <label>{t("date_of_birth")}</label>

          <DatePicker
            name="dateOfBirth"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {/* {errors.lastName && touched.lastName && (
            <p className="error">{errors.lastName}</p>
          )} */}

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
          {/* {errors.telephoneNumber && touched.telephoneNumber && (
            <p className="error">{errors.telephoneNumber}</p>
          )} */}

          <h3>{t("address")}</h3>
          <label> {t("unit_number")}</label>
          <input
            className={
              errors.unit_number && touched.unit_number
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.unit_number}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="unit_number"
            placeholder={t("unit_number")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label> {t("first_line")}</label>
          <input
            className={
              errors.first_line && touched.first_line
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.first_line}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="first_line"
            placeholder={t("first_line")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label> {t("second_line")}</label>
          <input
            className={
              errors.second_line && touched.second_line
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.second_line}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="second_line"
            placeholder={t("second_line")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label> {t("city")}</label>
          <input
            className={
              errors.city && touched.city
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="city"
            placeholder={t("city")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label> {t("governorate")}</label>
          <input
            className={
              errors.governorate && touched.governorate
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.governorate}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="governorate"
            placeholder={t("governorate")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <input
            className="form-button"
            disabled={isSubmitting}
            type="submit"
            value={t("register")}
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

export default PatientRegistration;
