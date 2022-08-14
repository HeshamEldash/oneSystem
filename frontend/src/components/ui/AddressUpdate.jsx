import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation } from "react-router-dom";
import { updateAddress } from "../../utils/api_calls/addressApis";


function AddressUpdate(props) {
  const { t } = useTranslation();
  const {state} = useLocation()

    const onSubmit = (values, actions)=>{
        updateAddress(1, values)
         actions.resetForm();

    }
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
      unit_number: state.unit_number,
      first_line: state.first_line,
      second_line: state.second_line,
      city: state.city,
      governorate: state.governorate,
    },
    onSubmit,
  });

  return (
    <div>
    <form className="user-form" type="submit" onSubmit={handleSubmit}>
    <label> {t("first_line")}</label>
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
          type="text"first_line
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
          value={t("submit")}
        />
    </form>
      
    </div>
  )
}

export default AddressUpdate
