import React, {useState} from 'react'
import {Outlet} from "react-router-dom"
import RegisterationPage from './Registration'
import RegistrationFormWrapper from './RegistrationFormWrapper'
function RegistrationLayout() {
 const [step, setStep] = useState(1)
 const [regClinic, setRegClinic] = useState(true)


  return (
    <div style={{backgroundColor:"#f1f1f142", minHeight:"100vh", display:"flex", justifyContent:"center",
      // background:"linear-gradient(135deg, rgb(76, 6, 67) 0.00%,rgb(67, 22, 102) 33.00%,rgb(67, 22, 102) 62.00%,rgb(97, 44, 138) 84.00%)",
      backgroundColor:"#EFF0F2",
      flexDirection:"column", alignItems:"center", paddingBlock : "8%",
  
     }}>
     

          <Outlet context={[step, setStep, regClinic]}/>

    </div>
  )
}

export default RegistrationLayout
