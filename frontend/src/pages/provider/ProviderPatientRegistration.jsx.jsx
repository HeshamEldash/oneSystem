import React, { useState, useContext } from "react";

import { Link, useNavigate , useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
import DatePicker from "react-datepicker";

function ProviderPatientRegistration() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date());

  let onSubmit = async (values, actions) => {
    let newPatient = await fetch(`${APIENDPOINT}/users/patient-profile-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        provider: id,
        first_name: values.firstName,
        middle_names: values.middleNames,
        last_name: values.lastName,
        gender:values.gender,
        date_of_birth: "2019-10-10",
        telephone_numbers: [
          {
            telephone_number: values.telephoneNumber,
          },
        ],
        address: {
          unit_number: values.unit_number,
          first_line: values.first_line,
          second_line: values.second_line,
          city: values.city,
          governorate: values.governorate,
        },
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    });

    if (newPatient){
      navigate(`/provider/${id}/patient-record/${newPatient.id}`)
  }

    // actions.resetForm();
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
      gender:"",
      telephoneNumber: "",
      date_of_birth: "2019-10-10",
      unit_number: "",
      first_line: "",
      second_line: "",
      city: "",
      governorate: "",
    },
    onSubmit,
  });

  return (
    <>
      <div className="page_header__container">
          <h1 className="page_header__title">{t("register_a_patient")}</h1>
      </div>
      <form
        className="user-form--centered form-padding"
        type="submit"
        onSubmit={handleSubmit}
      >
    

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

          <label>{t("gender")}</label>
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

        <label>{t("date_of_birth")}</label>

        <DatePicker
          className={
            errors.firstName && touched.firstName
              ? "input-error form-fields"
              : "form-fields"
          }
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />

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
          value={t("register_patient")}
        />
      </form>
    </>
  );
}

export default ProviderPatientRegistration;
