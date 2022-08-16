import React, {useContext} from 'react'
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate   } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

function RegistrationChoice() {
  const { t,i18n } = useTranslation();
const {user} = useContext(AuthContext)
    const navigate = useNavigate();
  return (
    <>
    {user? 
        navigate("/"):
    
    <div>
        <Link to="/register/staff" style={{"display": "block"}}>
      {t("Register a clinic")}
      </Link>

      <Link to="/registration/staff" style={{"display": "block"}}>
      {t("Register as individual")}
      </Link>
    </div>
    }
    </>
  )
}

export default RegistrationChoice
