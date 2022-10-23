import React from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import Icd from "../../../externalapis/icd-10/Icd";
import { createPastCodition } from "../apiCalls/recordsApiCalls";
import { useRecordContext } from "../context/RecordContextHook";

function AddPastCondition({ pastCondition, updateParent }) {
  const { t } = useTranslation();
  const { patient } = useRecordContext();

  const onSubmit = (values, actions) => {
    if (values.condition === "") {
      actions.resetForm();

      return alert(t("You cannot add an empty condition"));
    }

    values.date_diagnosed = values.date_diagnosed.toISOString().split("T")[0];

    createPastCodition(patient.id, values);
    // !!closeModal && closeModal();
    actions.resetForm();
    updateParent((prev) => [...prev, values]);
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
      condition: pastCondition?.condition || "",
      date_diagnosed: pastCondition?.date_diagnosed || new Date(),
      icd_code: pastCondition?.icd_code || "",
    },
    onSubmit,
  });

  return (
    <div>
      <h3 className="record_inner_container--title">
        {t("add_a_medical_condition")}
      </h3>
      <div className="add_condition_box">
        <form
          className="user-fodrm grid_form"
          type="submit"
          onSubmit={handleSubmit}
        >
          <label className="label grid_form--span1"> {t("condition")}</label>
          <input
            className={
              errors.condition && touched.condition
                ? "input-error form-fields label grid_form--span2"
                : "form-fields grid_form--span2"
            }
            value={values.condition}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="condition"
          />

          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label className="label grid_form--span1">
            {" "}
            {t("date_diagnosed")}
          </label>

          <div className="grid_form--span2">
            <DatePicker
              className="form-fields grid_form--span2"
              name="date_diagnosed"
              dateFormat="yyyy/MM/dd"
              selected={new Date(values?.date_diagnosed)}
              onChange={(date) => setFieldValue("date_diagnosed", date)}
            />
          </div>

          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

          <label className="label grid_form--span1"> {t("icd_code")}</label>
          <input
            className={
              errors.icd_code && touched.icd_code
                ? "input-error form-fields grid_form--span2"
                : "form-fields grid_form--span2"
            }
            value={values.icd_code}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="icd_code"
          />
          {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}
          <input
            className="record_entry__button grid_form--spanAll"
            disabled={isSubmitting}
            type="submit"
            value={t("submit")}
          />
        </form>
      </div>
      <Icd/>
    </div>
  );
}

export default AddPastCondition;
