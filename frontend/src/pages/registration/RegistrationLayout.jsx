import React, {useState} from 'react'
import {Outlet} from "react-router-dom"
import RegisterationPage from './Registration'
import RegistrationFormWrapper from './RegistrationFormWrapper'
function RegistrationLayout() {
 const [step, setStep] = useState(1)
 const [regClinic, setRegClinic] = useState(true)


  return (
    <div style={{minHeight:"100vh", display:"flex", justifyContent:"center",
        backgroundColor:"#EFF0F2",
      flexDirection:"column", alignItems:"center", paddingBlock : "8%",
  
     }}>
     

          <Outlet context={[step, setStep, regClinic]}/>

    </div>
  )
}

export default RegistrationLayout
