import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import StaffProfiles from './StaffProfiles'
import SideBar from '../../components/ui/SideBar'
import "./staff.css"
import { BrowserRouter as Router, Route, Routes, Link,NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext'
import StaffProfileItem from './StaffProfileItem'

import APIENDPOINT from '../../utils/api_calls/apiEndpoint'

function StaffDashboard() {
  const { t,i18n } = useTranslation();
  const{user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [ownedProvider, setOwnedProvider]= useState()

  const getOwnedProvider = async()=>{
      const response = await fetch (`${APIENDPOINT}/users/provider/${user.user_id}?` + new URLSearchParams({owner_id:user.user_id}), {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
      )

      if (response.ok) {
        const data =await response.json()
        console.log(data)
        setOwnedProvider(data)
      }
  }

  useEffect(()=>{
    getOwnedProvider()
  },[])

  return (<>
    <Navbar/> 
    <div className='staff-dashboard-main'>
    <h1>{t("My Dashboard")}</h1>
  

      {!!ownedProvider?
      <div className='primary-container'>
        <h3>{t("my_clinic")}</h3>
        <StaffProfileItem
          providerID={ownedProvider?.id}
          provider={ownedProvider?.name}


        />
        </div> 
      :
      <div className='call-to-action__box'>
      <span className='call-to-action__header'>{t("would you like to register a clinic to your account?")}</span>
      <input type="button"  onClick={()=>{navigate("/register/provider")}} className="bd" value={t("register_a_provider")}/>
     
 
      </div>
      }

      <div className='staff-dashboard-inner'>
      <StaffProfiles/>
      </div>

    </div>
    </>
  )
}

export default StaffDashboard
