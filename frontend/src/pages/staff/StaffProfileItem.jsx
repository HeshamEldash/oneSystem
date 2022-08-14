import React, { useContext, useEffect, useState }  from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { getLogins, createLogin,getLastLogin } from "../../utils/api_calls/getLogins"

function StaffProfileItem(props) {
const[login, setLogin]= useState({})

const { t,i18n } = useTranslation();
// const formattedTime = DateTime
// .fromFormat(props.lastLogin, "yyyy-MM-dd HH:mm:ss")
// .toFormat('MM/dd/yyyy h:mm a');

const getLogin = async ()=>{
    const log= await getLastLogin(props.staff,props.provider_id )
    setLogin(log)
  }

  useEffect(() => {
    getLogin(); 
  }, []);


  return (
    <div className='staff-profile-item'>

    <span>{props.providerName}</span>
    <span>{login?.start_time}</span>
    <Link onClick={()=>{createLogin(1,1)}} className="item-link" to="/provider-home" style={{"display": "block"}}>
        {t("go_to_profile")}
      </Link>
    
    </div>
  )
}

export default StaffProfileItem
