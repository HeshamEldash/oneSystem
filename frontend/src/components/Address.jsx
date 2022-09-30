import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import "./components.css";
import { deleteAddress } from "../utils/api_calls/addressApis";
import APIENDPOINT from "../utils/api_calls/apiEndpoint";
export function Address({ address, children, deleteFromParent }) {
// addrrss is the current address being displayed 
// deleteFromParentProp is used to remove the item from the parent list  


  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="address-display">
        <span>{address?.unit_number}</span>
        <span>{address?.first_line}</span>
        <span>{address?.second_line}</span>
        <span>{address?.city}</span>
        <span>{address?.governorate}</span>

        {children}

        <DeleteIcon
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() => {
            deleteAddress(address.id);
            deleteFromParent();
          }}
        />
      </div>
    </>
  );
}
