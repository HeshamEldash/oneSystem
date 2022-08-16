import React, {useState} from 'react'
import {Outlet} from "react-router-dom"
import RegisterationPage from './Registration'
function RegistrationLayout() {
 const [step, setStep] = useState(1)
 const [regClinic, setRegClinic] = useState(true)


  return (
    <div>
    
        <Outlet context={[step, setStep, regClinic]}/>

    </div>
  )
}

export default RegistrationLayout
