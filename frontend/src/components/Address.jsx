import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import "./components.css";
import { deleteAddress } from "../utils/api_calls/addressApis";

export function Address(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();


  const [address, setAddress] = useState(props?.address);


  return (
    <>
    <div className="address-display">
      <span>{address?.unit_number}</span>
      <span>{address?.first_line}</span>
      <span>{address?.second_line}</span>
      <span>{address?.city}</span>
      <span>{address?.governorate}</span>

      <input
        type="button"
        className="secondry-button"
        value={t("update")}
        onClick={()=>{
          navigate("/provider/address-update", { state: { 
            id: address?.id, 
            unit_number: address?.unit_number, 
            first_line: address?.first_line, 
            second_line: address?.second_line, 
            city: address?.city, 
            governorate: address?.governorate
          }} )
        }}
      />

    <DeleteIcon 
       color="error" 
    style = {{"cursor":"pointer"}}
    onClick={()=>{deleteAddress(address.id)}}/>

    </div>
  </>
  )
}
