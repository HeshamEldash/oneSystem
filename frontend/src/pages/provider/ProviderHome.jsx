import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes,NavLink, Link , useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/ui/Navbar";
import SideBar from "../../components/ui/SideBar";
import "./provider.css";
import { Outlet } from "react-router-dom"
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";


function ProviderHome() {
    const { t,i18n } = useTranslation();
    const { id } = useParams();
  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [employedStaff, setEmployedStaff] = useState([])
  const getAllStaff = async ()=>{
    const response = await fetch(`${APIENDPOINT}/users/staff-list/${id}/`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
          },
    })

    if(response.ok){
       const data = await response.json()
        setEmployedStaff(data)
    }

  } 

const setLocalStorage = ()=>{

}  
useEffect(()=>{
    getAllStaff()
    // localStorage.setItem("provider", JSON.stringify(data))
},[])

  return (
    <>

      <div className="provider-home-main">
      This si the provider home
        {registeredPatients?.map((patient)=>{
            <span>patient.id</span>
        })}
        {employedStaff?.map((staff)=>{
            return <div>
                <p>{staff.id}</p>
                <p>{staff.first_name}</p>
                <p>{staff.middle_names}</p>
                <p>{staff.last_name}</p>
                <p>{staff.staff_role}</p>
                <p>{staff.professional_number}</p>
                {staff?.telephone_numbers.map((num)=>{
                    return <p>{num}</p>
                })}



            </div>
        })}
      </div>
    </>
  );
}

export default ProviderHome;
