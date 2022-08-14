import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import StaffProfileItem from "./StaffProfileItem";
import {getLogins, createLogin, endLogin } from "../../utils/api_calls/getLogins"
const APIENDPOINT = "http://127.0.0.1:8000";
function StaffProfiles() {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  
  const getDetails = async () => {
    const response = await fetch(
      `${APIENDPOINT}/users/employment-staff-list/${user.email}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    setProfiles(data);
  };
  

  useEffect(() => {
    getDetails();
    
  }, []);


  return (
    <div className="staff-profiles">
      {profiles?.map((profile) => (
        <StaffProfileItem
          key={profile?.id}
          staff ={profile?.staff}
          provider_id={profile?.provider?.id}
          providerName={profile?.provider?.name}
          provider={profile?.provider}
    
        />
      ))}
    </div>
  );
}

export default StaffProfiles;
