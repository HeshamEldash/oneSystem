import React, { useContext } from 'react'
import StaffContextProvider from './StaffContext'
import StaffDashboard from './StaffDashboard'

function StaffWrapper() {

  return (
    <StaffContextProvider>
        <StaffDashboard/>
    </StaffContextProvider>
  )
}

export default StaffWrapper
