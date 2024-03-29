import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import "./components.css";
import { deleteAddress } from "../api/addressApis.jsx";
import APIENDPOINT from "../api/apiEndpoint.jsx";
export function Address({ address, children, deleteFromParent }) {
  // addrrss is the current address being displayed
  // deleteFromParentProp is used to remove the item from the parent list

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="inner-page-box inner-page-box--flex box_min_width ">
        <span>{address?.unit_number}</span>
        <span>{address?.first_line}</span>
        <span>{address?.second_line}</span>
        <span>{address?.city}</span>
        <span>{address?.governorate}</span>

        <div className="inpage-container__footer align-items-center">
          {children}
          <DeleteIcon
            color="error"
            style={{ cursor: "pointer"}}
            onClick={() => {
              deleteAddress(address.id);
              deleteFromParent();
            }}
          />
        </div>
      </div>
    </>
  );
}
