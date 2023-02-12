import React, { useContext } from 'react'
import ProviderMainContainer from '../provider/ProviderMainContainer'
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
