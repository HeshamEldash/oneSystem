import React, { useContext } from 'react'
import { AppointmentsContextProvider } from '../appointments/AppointmentsContext'
import ProviderContextProvider  from './context/ProviderContext'
import ProviderLayout from './ProviderLayout'

function ProviderMainContainer() {



  return (
    <ProviderContextProvider>
    <AppointmentsContextProvider>
      <ProviderLayout/>
      </AppointmentsContextProvider>
    </ProviderContextProvider>
  )
}

export default ProviderMainContainer
