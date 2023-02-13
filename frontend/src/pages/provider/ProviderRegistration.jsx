import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { createProvider } from "./api/providerApi";
import AuthContext from "../../context/AuthContext";
import RegistrationFormWrapper from "../registration/RegistrationFormWrapper";
import MediumInput from "../../components/ui/inputs/MediumInput";
import SmallButton from "../../components/ui/SmallButton";

function ProviderRegistration() {
  const { t } = useTranslation();
  const { loginUse, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const providerData = await createProvider(values, user.user_id);
    // actions.resetForm();
    navigate(`/app/provider/${providerData.id}`);
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
      name: "",
      unit_number: "",
      first_line: "",
      second_line: "",
      city: "",
      governorate:"",
      telephone_number: ""
    },
    onSubmit,
  });

  return (
    <RegistrationFormWrapper>
    <div className="form-header-container">
        <h1 className="provider-home-mauin__headers">
          {t("Register your clinic")}
        </h1>
      </div>


      <form className="user-form" type="submit" onSubmit={handleSubmit}>
        <label> {t("provider-name")}</label>

        <input
          type="text"
          name="name"
          placeholder={t("enter_your_clinic_name")}
          className={
            errors.name && touched.name
              ? "input-error form-fields"
              : "form-fields"
          }
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

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

        <label> {t("telephone_number")}</label>
        <input
          className={
            errors.telephone_number && touched.telephone_number
              ? "input-error form-fields"
              : "form-fields"
          }
          value={values.telephone_number}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="telephone_number"
          placeholder={t("telephone_number")}
        />
        <input
          className="form-button"
          disabled={isSubmitting}
          type="submit"
          value={t("submit")}
        />
      </form>
        <div style={{width:"100%", marginInlineStart:"80%"}}>
          <SmallButton
            className="form-button"
            value={t("skip")}
            onClick= {()=>navigate("/app/staff-dashboard")}
          />
      </div>
</RegistrationFormWrapper>
  );
}

export default ProviderRegistration;
