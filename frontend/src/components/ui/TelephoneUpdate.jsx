import React, { useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import APIENDPOINT from "../../api/apiEndpoint.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const token = JSON.parse(localStorage.getItem("authTokens"));

function TelephoneUpdate({
  create,
  telephone_number,
  telephone_id,
  owner_id,
  owner_type,
  controlParent,
  showButtons,
  updateing,
}) {
  const { t } = useTranslation();
  const deleteNumber = async (telephone_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/telephone-number-detail/${telephone_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
      }
    );
  };
  const updateNumber = async (telephone_id, telephone_number) => {
    const response = await fetch(
      `${APIENDPOINT}/users/telephone-number-detail/${telephone_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        body: JSON.stringify({
          telephone_number: telephone_number,
        }),
      }
    );
  };

  const createNumber = async (owner_id, telephone_number, owner_type) => {
    const response = await fetch(
      `${APIENDPOINT}/users/telephone-number-list/${owner_type}/${owner_id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        body: JSON.stringify({
          telephone_number: telephone_number,
        }),
      }
    );
  };

  const onSubmit = (values, actions) => {
    create
      ? createNumber(owner_id, values.telephone_number, owner_type)
      : updateNumber(telephone_id, values.telephone_number);

    create && controlParent((prev) => [...prev, values]);
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
      telephone_number: telephone_number || "",
    },
    onSubmit,
  });

  return (
    <div className="telephone_update_component">
      <form
        className="user-form--telephone"
        type="submit"
        onSubmit={handleSubmit}
      >
        <input
          className={
            errors.telephone_number && touched.telephone_number
              ? "input-error form-fields"
              : "form-fields"
          }
          type="text"
          value={values.telephone_number}
          name="telephone_number"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={updateing == undefined ? false : !updateing}
        />
        {showButtons && (
          <input
            type="submit"
            value={create ? t("add") : t("update")}
            className="b3 b3--small"
          />
        )}
      </form>

      {telephone_id && showButtons && (
        <DeleteIcon
          className="delete_icon"
          sx={{
            fontSize: 35,
          }}
          onClick={() => {
            deleteNumber(telephone_id);
            controlParent((prev) => {
              const newList = prev.filter((number) => {
                return number.id != telephone_id;
              });
              return newList;
            });
          }}
        />
      )}
    </div>
  );
}

export default TelephoneUpdate;
