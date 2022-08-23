import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import StaffProfiles from './StaffProfiles'
import SideBar from '../../components/ui/SideBar'
import "./staff.css"
import { BrowserRouter as Router, Route, Routes, Link,NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext'

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
        const data = response.json()
        setOwnedProvider(data)
    }
  }

  useEffect(()=>{
    getOwnedProvider()
  },[])

  return (
    <div className='staff-dashboard-main'>
      <Navbar>
        <NavLink to=""/>
      </Navbar>
      <SideBar/>
     <div className='staff-dashboard-inner'>
      <StaffProfiles/>
      </div>

      {!ownedProvider && 
      <div className='staff-dashboard-inner'>
      <input type="button"  onClick={()=>{navigate("/register/provider")}} className="item-link" />
        {t("register_a_provider")}
 
      </div>
      }
    </div>
  )
}

export default StaffDashboard
