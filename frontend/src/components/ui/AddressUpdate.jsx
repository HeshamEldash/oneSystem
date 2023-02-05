import React, { useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  createAddress,
  updateAddress,
} from "../../api/addressApis.jsx";

function AddressUpdate({ address, closeModal,addressFormSubmitRef, updateParent, addressId, ownerType, ownerId }) {

  /**
  addressupdate component is very flexible, it can work independently or as part of a parent. 
  It can also be a part of a modal. 
  it all depends on which props to pass... 

  to work with a parent pass {addressId,address,addressFormSubmitRef, updateParent }

  addressId is passed to ensure that the address is updated when the address prop gets passsed a rendered address
  address: the address to be updated, if address is not passed the component will create a new address instead of updating
  addressFormSubmitRef is a useRef hook declared in the parent 
  updateParent: a callback function that controls the state of the address in the parent 
 */
  const { t } = useTranslation();

  const { id } = useParams();


  const onSubmit = (values, actions) => {
    if (!!address) {
      addressId ?  updateAddress(addressId, values) :updateAddress(address.id, values);
    } else {
      createAddress(ownerId, values, ownerType);
    }
    !!closeModal && closeModal();
    // actions.resetForm();
    updateParent(values)
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
      unit_number: address?.unit_number || "",
      first_line: address?.first_line || "",
      second_line: address?.second_line || "",
      city: address?.city || "",
      governorate: address?.governorate || "",
    },
    onSubmit,
  });

  return (
    <div>
      <form
        className="user-form"
        type="submit"
        onSubmit={handleSubmit}
      >
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
          value={t("submit")}
           ref={addressFormSubmitRef && addressFormSubmitRef}
           style={{display: addressFormSubmitRef && "none"}}

        /> 
      </form>
    </div>
  );
}

export default AddressUpdate;
