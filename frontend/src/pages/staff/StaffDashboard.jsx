import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import StaffProfiles from './StaffProfiles'
import SideBar from '../../components/ui/SideBar'
import "./staff.css"
import { BrowserRouter as Router, Route, Routes, Link,NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext'
import StaffProfileItem from './StaffProfileItem'

const APIENDPOINT = "http://127.0.0.1:8000";

function StaffDashboard() {
  const { t,i18n } = useTranslation();
  const{user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [ownedProvider, setOwnedProvider]= useState({})

  const getOwnedProvider = async()=>{
      const response = await fetch (`${APIENDPOINT}/users/provider/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
      )

      if (response.ok) {
        const data =await response.json()
        setOwnedProvider(data)
      }
  }

  useEffect(()=>{
    getOwnedProvider()
  },[])

  return (
    <div className='staff-dashboard-main'>
    <Navbar/> 
    

      {ownedProvider?
      <div className='primary-container'>
        <h3>owned_clinic</h3>
        <StaffProfileItem
          providerID={ownedProvider?.id}
          provider={ownedProvider?.name}
        />
        </div> 
      :
      <div className='staff-dashboard-inner'>
      <input type="button"  onClick={()=>{navigate("/register/provider")}} className="item-link" />
        {t("register_a_provider")}
 
      </div>
      }

      <div className='staff-dashboard-inner'>
      <StaffProfiles/>
      </div>
    </div>
  )
}

export default StaffDashboard
