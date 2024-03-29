import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { initReactI18next, useTranslation } from "react-i18next";
import APIENDPOINT from "../../api/apiEndpoint.jsx";
import ResultsBox from "../../components/ResultsBox";
import { searchPatients } from "./api/providerApi";
import { useParams, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import Checkbox from "@mui/material/Checkbox";

import FormControlLabel from "@mui/material/FormControlLabel";
import "react-datepicker/dist/react-datepicker.css";

export function ProviderPatientSearch({ exportPt }) {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const [startDate, setStartDate] = useState(new Date());
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);

  const handleBoxChange = (event) => {
    setAdvancedSearch(event.target.checked);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onSubmit = async (values) => {
    values.dateOfBirth = startDate.toISOString().split("T")[0];

    const patients = advancedSearch
      ? await searchPatients(values)
      : await searchPatients(values, id);

    setPatients(patients);
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
      dateOfBirth: startDate.toISOString().split("T")[0],
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
      <h1>search a patient</h1>

      <form
        className="search-form primary--page-bdox nighth-first-name-search"
        type="submit"
        onSubmit={handleSubmit}
      >
        <div className="search-form__inputs">
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
            <label> {t("date_of_birth")}</label>
            <DatePicker
              className="form-fields"
              name="dateOfBirth"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div>
          <input
            className="form-button"
            disabled={isSubmitting}
            type="submit"
            value={t("search")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={advancedSearch}
                onChange={handleBoxChange}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            }
            label={t("search_patients_not_registered_with_you")}
          />
        </div>
      </form>

      <div className="tenth-search-results">
      <ResultsBox
        headerElements={[
          "first name",
          "second name",
          "last name",
          "date of birth",
          "telephone number",
          "email",
          "address",
        ]}
        paginationCount={patients?.length}
        tableSize=""
        stickyHeader={true}
        headerBackground={"#1890ff"}
      >
        {patients?.map((patient) => {
          return (
            <StyledTableRow
              key={patient.id}
              onDoubleClick={() => {
                if (exportPt) {
                  exportPt(patient);
                  return;
                }

                navigate(`/app/provider/${id}/patient-record/${patient.id}`);
              }}
            >
              <StyledTableCell>{patient.first_name}</StyledTableCell>
              <StyledTableCell>{patient.middle_names}</StyledTableCell>
              <StyledTableCell>{patient.last_name}</StyledTableCell>
              <StyledTableCell>{patient.date_of_birth}</StyledTableCell>
              <StyledTableCell>
                {patient.telephone_numbers &&
                  patient.telephone_numbers[0]?.telephone_number}
              </StyledTableCell>
              <StyledTableCell>{patient.account_email}</StyledTableCell>
              <StyledTableCell>
                {patient.address &&
                  patient.address.unit_number +
                    " " +
                    patient.address.first_line +
                    " " +
                    patient.address.city}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </ResultsBox>
      </div>
    </>
  );
}

export default ProviderPatientSearch;
