import React, { useContext } from 'react'
import { BrowserRouter as Router, useLocation, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect.jsx";
import "./header.css"
import logo from "../assets/logo.png"
import AuthContext from '../context/AuthContext.jsx';

function Header() {

  const { t,i18n } = useTranslation();
  const {logoutUser, user}= useContext(AuthContext)
  const location = useLocation()
  console.log(location)

  return (
    <div className={i18n.language === 'en' ?  'header english': 'header arabic'} >
        {/* <img className={"logo"} src={logo} alt="logo image"  /> */}
        
        {!!user && <h1>{user.email}</h1>}
      <LanguageSelect/>
      <Link to="/registration-choice" style={{"display": "block"}}>
      {t("Register")}
      </Link>
      
      <Link to="/login" style={{"display": "block"}}>
      {t("login")}
      </Link>
      <div onClick={logoutUser} className="header-content">    {t("logout")}</div>

    </div>
  )
}

export default Header
