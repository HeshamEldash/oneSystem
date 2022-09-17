import React, { useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { updatePatinetProfile } from "../../records/apiCalls/recordsApiCalls";

function PatientProfileUpdateComponent({
  profile,
  closeModal,
  profileFormSubmitRef,
  updateParent,
  profileId,
}) {
  const { t } = useTranslation();

  const onSubmit = (values, actions) => {
    if (typeof values.date_of_birth === "object") {
      const formatedValues = {
        ...values,
        date_of_birth: values.date_of_birth.toISOString().split("T")[0],
      };
      updatePatinetProfile(formatedValues, profileId);
      updateParent(formatedValues);
    } else {
      updatePatinetProfile(values, profileId);
      updateParent(values);
    }

    !!closeModal && closeModal();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    enableReinitialize,
    setFieldValue,
  } = useFormik({
    initialValues: {
      first_name: profile?.first_name || "",
      middle_names: profile?.middle_names || "",
      last_name: profile?.last_name || "",
      date_of_birth: profile?.date_of_birth || new Date(),
      gender: profile?.gender || "",
    },
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form className="user-form" type="submit" onSubmit={handleSubmit}>
      <label className="label"> {t("first_name")}:</label>
      <input
        type="text"
        name="first_name"
        className={
          errors.firstName && touched.firstName
            ? "input-error form-fields"
            : "form-fields"
        }
        value={values.first_name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <label className="label"> {t("middle_names")}:</label>
      <input
        type="text"
        name="middle_names"
        className={
          errors.middle_names && touched.middle_names
            ? "input-error form-fields"
            : "form-fields"
        }
        value={values.middle_names}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label className="label"> {t("last_name")}:</label>
      <input
        type="text"
        name="last_name"
        className={
          errors.last_name && touched.last_name
            ? "input-error form-fields"
            : "form-fields"
        }
        value={values.last_name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <label className="label"> {t("date_of_birth")}:</label>
      <DatePicker
        className="form-fields"
        name="date_of_birth"
        dateFormat="yyyy/MM/dd"
        selected={new Date(values?.date_of_birth)}
        onChange={(date) => setFieldValue("date_of_birth", date)}
      />
      {profile?.date_of_birth}

      <label className="label"> {t("gender")}:</label>
      <Select
        value={values.gender}
        name="gender"
        onChange={handleChange}
        displayEmpty
        className="form-fields"
      >
        <MenuItem value={"MALE"}>{t("male")}</MenuItem>
        <MenuItem value={"FEMALE"}>{t("female")}</MenuItem>
      </Select>

      <input
        className="form-button"
        disabled={isSubmitting}
        type="submit"
        value={t("submit")}
        ref={profileFormSubmitRef && profileFormSubmitRef}
        style={{ display: profileFormSubmitRef && "none" }}
      />
    </form>
  );
}

export default PatientProfileUpdateComponent;
