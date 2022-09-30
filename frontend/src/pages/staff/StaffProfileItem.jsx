import React, { useContext, useEffect, useState }  from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { getLogins, createLogin,getLastLogin } from "../../utils/api_calls/getLogins"

function StaffProfileItem(props) {
const[login, setLogin]= useState()


const { t,i18n } = useTranslation();
// const formattedTime = DateTime
// .fromFormat(props.lastLogin, "yyyy-MM-dd HH:mm:ss")
// .toFormat('MM/dd/yyyy h:mm a');

const getLogin = async ()=>{
    if(props.staffId) { 
    const log= await getLastLogin(props.staffId,props.providerID )
    setLogin(log)
    }
  }

  useEffect(() => {
    getLogin(); 

  }, []);


  return (
    <div className='staff-profile-item'>

    <span className='staff-profile-item--name'>{props.provider}</span>
    <span>{login && "last login: " + new Date(login.start_time).toLocaleString() }</span>
    
    <Link onClick={()=>{
      localStorage.setItem("provider", JSON.stringify(props.providerID))
      createLogin(props.staffId,props.providerID)
      
      }} className="item-link" to={`/provider/${props.providerID}`} style={{"display": "block"}}>
        {t("go_to_profile")}
      </Link>
    
    </div>
  )
}

export default StaffProfileItem
