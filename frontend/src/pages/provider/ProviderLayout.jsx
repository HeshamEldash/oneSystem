import React from 'react'
import { useTranslation } from "react-i18next";

import {Outlet, NavLink, useParams} from "react-router-dom"
import Navbar from '../../components/ui/Navbar'
import SideBar from '../../components/ui/SideBar'
function ProviderLayout() {
  const { t,i18n } = useTranslation();
  const { id } = useParams();

  return (

    <div className='page-container'>
      {/* <SideBar/> */}
      <Navbar>
      <NavLink className="navlink_item" to={`/provider/${id}/patient-registration`}>
      {t("register_a_patient")}
      </NavLink>
      <br/>

      <NavLink className="navlink_item" to={`/provider/${id}/profile-update`} >
      {t("update_profile")}
      </NavLink>

      <NavLink className="navlink_item" to= {`/provider/${id}/register-staff`}>
      {t("register_staff")}
      </NavLink>

      <NavLink className="navlink_item" to= {`/provider/${id}/manage-staff`}>
      {t("manage_staff")}
      </NavLink>

      </Navbar>

      <Outlet/>
    </div>
  )
}

export default ProviderLayout
