import React, {useState} from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
import ResultsBox from "../../components/ResultsBox";

function ProviderPatientSearch() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const { t } = useTranslation();
  const [patients, setPatients] = useState([])
  const onSubmit = async (values) => {
    
    const response = await fetch(
      `${APIENDPOINT}/users/testing/?` + new URLSearchParams(values),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      }
    );
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
      dateOfBirth: "",
      account: "",
      firstName: "",
      middleNames: "",
      lastName: "",
      telephoneNumber: "",
      address: "",
    },

    onSubmit,
  });

  return (
    <>
      <form className="user-fodrm" type="submit" onSubmit={handleSubmit}>
        <div className="form-input--group">
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
            type="text"
            name="email"
            placeholder={t("enter_your_email")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("date_of_birth")}</label>
          <input
            className={
              errors.dateOfBirth && touched.dateOfBirth
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="dateOfBirth"
            placeholder={t("date_of_birth")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("first_name")}</label>
          <input
            className={
              errors.firstName && touched.firstName
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="firstName"
            placeholder={t("first_name")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("middle_names")}</label>
          <input
            className={
              errors.middleNames && touched.middleNames
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.middleNames}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="middleNames"
            placeholder={t("middle_names")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("last_name")}</label>
          <input
            className={
              errors.lastName && touched.lastName
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="lastName"
            placeholder={t("last_name")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("telephone_number")}</label>
          <input
            className={
              errors.telephoneNumber && touched.telephoneNumber
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.telephoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="telephoneNumber"
            placeholder={t("telephone_number")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <div className="form-input--group">
          <label> {t("address")}</label>
          <input
            className={
              errors.address && touched.address
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="address"
            placeholder={t("address")}
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
        </div>

        <input
          className="form-button"
          disabled={isSubmitting}
          type="submit"
          value={t("search")}
        />
      </form>

      <ResultsBox
        headerElements={["first name", "second name",
        "last name", "date of birth","telephone number",
        "email"
        ,"address",

        
        
        ]}
      >
        sakfskfah
      </ResultsBox>
    </>
  );
}

export default ProviderPatientSearch;
