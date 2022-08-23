import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import ProviderEmploymentForm from './ProviderEmploymentForm';
import ProviderRegisterStaff from "./ProviderRegisterStaff"

function ProviderStartEmployment() {
    const navigate = useNavigate();
    const [alreadyReg, setAlreadyReg] = useState(false)
    const [newReg, setNewReg] = useState(false)

    const { t } = useTranslation();

  return (
    <div className='page-component-main'>

        <div className='inpage-container' onClick={()=>{setAlreadyReg(prev=>!prev)
        setNewReg(false)
        }}>
            staff_already_registered
        </div>

        <div className='inpage-container' onClick={()=>{setNewReg(prev=>!prev) 
        setAlreadyReg(false)
        }}>
            Staff new to app
        </div>
        { alreadyReg &&
            <ProviderEmploymentForm/>   
        }
        {newReg &&
         
            <ProviderRegisterStaff/>

        }

    </div>
  )
}

export default ProviderStartEmployment
