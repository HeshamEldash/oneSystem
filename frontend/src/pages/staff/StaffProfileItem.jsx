import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function StaffProfileItem(props) {
  const { t,i18n } = useTranslation();

  return (
    <div className='staff-profile-item'>

    <span>{props.providerName}</span>
    <Link className="item-link" to="/provider-home" style={{"display": "block"}}>
        {t("go_to_profile")}
      </Link>
    </div>
  )
}

export default StaffProfileItem
