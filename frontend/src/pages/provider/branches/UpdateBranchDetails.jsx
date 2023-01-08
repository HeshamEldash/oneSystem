import React from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

function UpdateBranchDetails({ branch }) {
  const { t } = useTranslation();

  const onSubmit = (values) => {
    console.log(values);
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
      branch_name: branch?.branch_name || "",

      branchaddress: {
        unit_number: branch?.branchaddress?.unit_number || "",
        first_line: branch?.branchaddress?.first_line || "",
        second_line: branch?.branchaddress?.second_line || "",
        city: branch?.branchaddress?.city || "",
        governorate: branch?.branchaddress?.governorate || "",
      },

      telephone_numbers: branch?.telephone_numbers,
    },
    onSubmit,
  });

  const addPhone = () => {};

  return (
    <div className="primary--page-box">
      <label>
        {t("Branch Name")}:
        <input
          type="text"
          value={values.branch_name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branch_name"
        />
      </label>
      <label>
        {t("unit_number")}:
        <input
          type="text"
          value={values.branchaddress.unit_number}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branchaddress.unit_number"
        />
      </label>
      <label>
        {t("first_line")}:
        <input
          type="text"
          value={values.branchaddress.first_line}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branchaddress.first_line"
        />
      </label>
      <label>
        {t("second_line")}:
        <input
          type="text"
          value={values.branchaddress.second_line}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branchaddress.second_line"
        />
      </label>
      <label>
        {t("city")}:
        <input
          type="text"
          value={values.branchaddress.city}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branchaddress.city"
        />
      </label>
      <label>
        {t("governorate")}:
        <input
          type="text"
          value={values.branchaddress.governorate}
          onChange={handleChange}
          onBlur={handleBlur}
          name="branchaddress.governorate"
        />
      </label>
      <div>
        <span>Telephone Numbers</span>
        {values?.telephone_numbers?.map((number, index) => {
          return (
            <div key={index}>
              <label>
                {t("number")}:
                <input
                  type="text"
                  value={number.telephone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={`telephone_numbers[${index}]`}
                />
              </label>
            </div>
          );
        })}

        {/* <input type="button" onClick={}/> */}
      </div>

      <input type="button" onClick={() => handleSubmit()} value={"update"} />
    </div>
  );
}

export default UpdateBranchDetails;
