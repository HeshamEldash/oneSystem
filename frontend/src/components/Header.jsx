import React, { useContext } from 'react'
import { BrowserRouter as Router, useLocation, Route, Routes, Link,NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect.jsx";
import "./header.css"
import logo from "../assets/logo.png"
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../context/AuthContext.jsx';

function Header() {

  const { t,i18n } = useTranslation();
  const {logoutUser, user}= useContext(AuthContext)
  const location = useLocation()

  return (
    // <div className={i18n.language === 'en' ?  'header english': 'header arabic'} >
    <div className={user?  'header header--small': 'header'} > 

        {/* <img className={"logo"} src={logo} alt="logo image"  /> */}
        
        {!!user && <h1>{user.email}</h1>}
      <LanguageSelect/>
      <div className="header-content">
      <NavLink className="header-coddntent" to="/record" style={{"display": "block"}}>
      {t("record")}
      </NavLink>
      </div>

      {user?
      <>
      <div className="header-content">
      <NavLink className="header-coddntent" to="/staff-dashboard" style={{"display": "block"}}>
      {t("staff_dashboard")}
      </NavLink>
      </div>
      <div onClick={logoutUser} className="header-content">    
      <LogoutIcon color={'primary'}/>
      {t("logout")}
      </div>


      </>
      
      :
      <>
      <div className="header-content">
      <NavLink className="header-coddntent" to="/registration-choice" style={{"display": "block"}}>
      {t("Register")}
      </NavLink>
      </div>
      <div className="header-content">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.32808 2.4C3.32808 1.73726 3.86534 1.2 4.52808 1.2C5.19082 1.2 5.72808 1.73726 5.72808 2.4V3.6L3.32808 3.6V2.4ZM2.12808 3.6V2.4C2.12808 1.07452 3.2026 0 4.52808 0C5.85356 0 6.92808 1.07452 6.92808 2.4V3.6H7.52813C8.19087 3.6 8.72813 4.13725 8.72813 4.8V7.8C8.72813 8.46274 8.19087 9 7.52813 9H1.52813C0.865383 9 0.328125 8.46274 0.328125 7.8V4.8C0.328125 4.13725 0.865383 3.6 1.52813 3.6H2.12808Z" fill="currentColor"></path></svg>
      <NavLink to="/login" className="headdder-content" style={{"display": "block"}}>
      {t("login")}
      </NavLink>
      </div>
      </>
      }
      

    </div>
  )
}

export default Header
