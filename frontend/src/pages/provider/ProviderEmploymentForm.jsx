
import React, { useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createEmployment } from './providerApi';
import { ToastContainer, toast } from "react-toastify";


function ProviderEmploymentForm() {
    const {t} = useTranslation()
    const {id} = useParams()

    const notify = (msg) => toast(t(msg), 
    {toastId: "customId",
    className: 'black-background',
    bodyClassName: "grow-font-size",
    }
    );
  

    const onSubmit = async (values, actions) => {
      console.log(values, id)
      const response = await createEmployment(values.staffEmail, id)
        notify(response.msg)
        actions.resetForm();
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
          staffEmail: "",
        },
        onSubmit,
      });

      
  return (
    <div>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl 
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
       style = {{"width": "100%"}}
      />


      <form className="user-form" type="submit" onSubmit={handleSubmit}>
      <label> {t("staff-email")}</label>
        <input
          className={
            errors.email && touched.email
              ? "input-error form-fields"
              : "form-fields"
          }
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="staffEmail"
          placeholder={t("enter_staff_email")}
        />
        {/* {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )} */}

        <input
          className="form-button"
          disabled={isSubmitting}
          type="submit"
          value={t("register_staff")}
        />


      </form>
      
    </div>
  )
}

export default ProviderEmploymentForm
