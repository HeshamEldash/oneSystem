import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes,NavLink, Link , useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/ui/Navbar";
import SideBar from "../../components/ui/SideBar";
import "./provider.css";
import { Outlet } from "react-router-dom"
const APIENDPOINT = "http://127.0.0.1:8000/";

function ProviderHome() {
    const { t,i18n } = useTranslation();
    const { id } = useParams();
  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [employedStaff, setEmployedStaff] = useState([])

  const getAllStaff = async ()=>{
    const response = await fetch(`${APIENDPOINT}users/staff-list/${id}/`, {
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
      <Navbar>
      <NavLink className="navlink_item" to={`/provider/${id}/patient-registration`}>
      {t("register_a_patient")}
      </NavLink>
      <br/>

      <NavLink className="navlink_item" to={`/provider/${id}/profile-update`} >
      {t("update_profile")}
      </NavLink>

      <NavLink className="navlink_item" to= {`/provider/${id}/register-staff`}>
      {t("register_staff")}
      </NavLink>

      </Navbar>
      <SideBar />
      {<Outlet />?<Outlet />:null}
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
