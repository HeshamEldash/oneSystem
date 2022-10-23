import React, { useContext } from 'react'
import ProviderContextProvider  from './context/ProviderContext'
import ProviderLayout from './ProviderLayout'

function ProviderMainContainer() {



  return (
    <ProviderContextProvider>
      <ProviderLayout/>
    </ProviderContextProvider>
  )
}

export default ProviderMainContainer
