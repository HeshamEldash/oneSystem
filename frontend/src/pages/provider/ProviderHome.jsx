import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/ui/Navbar";
import SideBar from "../../components/ui/SideBar";
import "./provider.css";

const APIENDPOINT = "http://127.0.0.1:8000/";

function ProviderHome() {
    const { t,i18n } = useTranslation();

  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [employedStaff, setEmployedStaff] = useState([])

  const getAllStaff = async ()=>{
    const response = await fetch(`${APIENDPOINT}users/staff-list/1/`, {
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

useEffect(()=>{
    getAllStaff()
},[])

  return (
    <>
      <Navbar>
      <Link to="/provider-patient-registration" style={{"display": "inline-block"}}>
      {t("register-a-patient")}
      </Link>
      <br/>
      <Link to="/provider-profile-update"  style={{"display": "inline-block"}}>
      {t("update-profile")}
      </Link>
      </Navbar>
      <SideBar />
      <div className="provider-home-main">
      This si the provider home
        {registeredPatients?.map((patient)=>{
            <span>patient.id</span>
        })}
        {employedStaff?.map((staff)=>{
            return <div>
                <p1>{staff.id}</p1>
                <p1>{staff.first_name}</p1>
                <p1>{staff.middle_names}</p1>
                <p1>{staff.last_name}</p1>
                <p1>{staff.staff_role}</p1>
                <p1>{staff.professional_number}</p1>
                {staff?.telephone_numbers.map((num)=>{
                    return <p1>{num}</p1>
                })}



            </div>
        })}
      </div>
    </>
  );
}

export default ProviderHome;
