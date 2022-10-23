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
  const [image, setImage] = useState()
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


useEffect(()=>{
    getAllStaff()
},[])

  return (
    <>

      <div className="provider-home-main">

     
      </div>
    </>
  );
}

export default ProviderHome;
