import React, { useContext, useEffect, useState }  from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { getLogins, createLogin,getLastLogin } from "../../api/getLogins.js"

function StaffProfileItem(props) {
const[login, setLogin]= useState()


const { t } = useTranslation();

const getLogin = async ()=>{

    if(props.staffId) { 
        const log = await getLastLogin(props.staffId, props.providerID )
    setLogin(log)
    }

  }

  useEffect(() => {
    getLogin(); 
  }, []);


  return (
    <div className='inner-page-box inner-page-box__small-width inner-page-box--flex'>

    <span className='staff-profile-item--name'>{props.provider}</span>
    <span>{login && "last login: " + new Date(login.start_time).toLocaleString() }</span>
    
    <Link onClick={()=>{
        createLogin(props.staffId,props.providerID)  
        }} className="page_button page_button-width-medium " to={`/app/provider/${props.providerID}`} style={{"display": "block"}}>
          {t("go_to_profile")}
    </Link>
    
    </div>
  )
}

export default StaffProfileItem
