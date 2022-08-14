import React from 'react'
import Navbar from '../../components/ui/Navbar'
import StaffProfiles from './StaffProfiles'
import SideBar from '../../components/ui/SideBar'
import "./staff.css"

function StaffDashboard() {
  return (
    <div className='staff-dashboard-main'>
      <Navbar/>
      <SideBar/>
     <div className='staff-dashboard-inner'>
      <StaffProfiles/>
      </div>
    </div>
  )
}

export default StaffDashboard
