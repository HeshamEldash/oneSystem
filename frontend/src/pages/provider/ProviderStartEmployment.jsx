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
        <div className=' primary--page-box '>
            <h3 className='margin_bottom_small'>Add new staff</h3>
            <div className='inner-page-box--flex-row width_100     '>
            <div className='inner-page-box  inner-page-box__small-width margin_bottom_small cursor_pointer' onClick={()=>{setAlreadyReg(prev=>!prev)
            setNewReg(false)
            }}>
                {t("staff_already_registered")}
            </div>
    
            <div className='inner-page-box inner-page-box__small-width margin_bottom_small cursor_pointer' onClick={()=>{setNewReg(prev=>!prev) 
            setAlreadyReg(false)
            }}>
                {t("staff_new_to_app")}
            </div>
            </div>
            { alreadyReg &&
            <div className='inner-page-box  '>
                <ProviderEmploymentForm/>  
             </div> 
            }
            {newReg &&
                <div className='inner-page-box '>
                <ProviderRegisterStaff/>
                </div>  
            }
    
        </div>
      )


  return (
    <div className=' inpage-container page_component__inpage--span2'>
        <h3>Add new staff</h3>
        <div className='inpage-container--rowflex--nostyle'>
        <div className='inpage-container inpage-container--centered ' onClick={()=>{setAlreadyReg(prev=>!prev)
        setNewReg(false)
        }}>
            {t("staff_already_registered")}
        </div>

        <div className='inpage-container inpage-container--centered ' onClick={()=>{setNewReg(prev=>!prev) 
        setAlreadyReg(false)
        }}>
            {t("staff_new_to_app")}
        </div>
        </div>
        { alreadyReg &&
        <div className='page_component__inpage--span3 '>
            <ProviderEmploymentForm/>  
         </div> 
        }
        {newReg &&
            <div className='page_component__inpage--span3'>
            <ProviderRegisterStaff/>
            </div>  
        }

    </div>
  )
}

export default ProviderStartEmployment
