import React, { useState, useContext } from "react";
import { registrationSchema } from "./RegistrationSchema";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "./registration.css"

function StaffProfileRegestiration() {
    const { t } = useTranslation();
    const onSubmit = ()=>{

    }
    const {values,errors,touched,isSubmitting,
        handleBlur,handleChange, handleSubmit
    } = useFormik({
        initialValues:{
            firstName: "",
            middleNames: "",
            lastName: "",
            telephoneNumber: "",
            professionalNumber: "",
        },
        validationSchema: registrationSchema,
        onSubmit ,
    })

  return (
    <div className="user-form-container">
      <form className="user-form" type="submit" onSubmit={handleSubmit}>
        <label> {t("first_name")}</label>

        <input
          type="text"
          name="firstName"
          placeholder={t("enter_your_first_name")}
          className={
            errors.firstName && touched.lastName
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
            errors.firstName && touched.lastName
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
        <input
            className="form-button"
            disabled={isSubmitting}
            type="submit"
            value={t("Next")}
          />
      </form>
    </div>
  );
}

export default StaffProfileRegestiration;
