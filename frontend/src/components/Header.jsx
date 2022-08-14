import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect.jsx";
import "./header.css"
import AuthContext from '../context/AuthContext.jsx';

function Header() {
  const { t,i18n } = useTranslation();
  const {logoutUser, user}= useContext(AuthContext)


  return (
    <div className={i18n.language === 'en' ?  'header english': 'header arabic'} >
        this is a header
        {!!user && <h1>{user.email}</h1>}
      <LanguageSelect/>
      <Link to="/register" style={{"display": "block"}}>
      {t("Register")}
      </Link>
      
      <Link to="/login" style={{"display": "block"}}>
      {t("login")}
      </Link>
      <div onClick={logoutUser} className="header-content">Logout</div>

    </div>
  )
}

export default Header
