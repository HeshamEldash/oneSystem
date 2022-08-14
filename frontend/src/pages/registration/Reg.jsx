import React, { useState, useContext } from "react";
import AccountRegistration from "./AccountRegistration";
import RegistrationContext, {RegistrationProvider} from "./RegistraionContext"
import HorizontalLinearStepper from "./RegStepper";
import StaffProfileRegestiration from "./StaffProfileRegestiration";

function Reg() {
    const {password} = useContext(RegistrationContext)
    const [accountCreated, setAccountCreated] = useState(false)
  return (
    <>
    {!accountCreated?    
    
    <AccountRegistration 
        setAccountCreated={setAccountCreated}
     />:
 
     <StaffProfileRegestiration/>
    }
    </>
  )
}

export default Reg


