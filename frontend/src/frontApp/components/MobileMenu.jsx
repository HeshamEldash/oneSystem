import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

import "./mobile-menu.css"


function MobileMenu() {
  const { t } = useTranslation();
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <div className='main_mobile_menu'>
     
        {!user && <div className='manu_subitem' onClick={()=>navigate("/login")}> {t("login")}</div>}
        {!user && <div className='manu_subitem' onClick={()=>navigate("/register/staff")}> {t("register")}</div>} 


        {user &&  <div className='manu_subitem' onClick={()=>navigate("/app/staff-dashboard")}> {t("staff_dashboard")}</div>}
    
        {user && <div className='manu_subitem' onClick={()=>logoutUser()}> {t("logout")}</div>}
        
    </div>
  )
}

export default MobileMenu
