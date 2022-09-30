import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import StaffProfileItem from "./StaffProfileItem";
import {getLogins, createLogin, endLogin } from "../../utils/api_calls/getLogins"
import { useTranslation } from "react-i18next";


import APIENDPOINT from "../../utils/api_calls/apiEndpoint";


function StaffProfiles() {
  const { t,i18n } = useTranslation();

  const { user, authTokens } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  
  const getDetails = async () => {
    const response = await fetch(
      `${APIENDPOINT}/users/employment-staff-list/${user.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(authTokens.access)
        },
      }
    );
    if (response.ok){
    const data = await response.json();
    setProfiles(data);

    }
  };
  

  useEffect(() => {
    getDetails();
    
  }, []);


  return (
    <div className="staff-profiles">

    {profiles.length === 0? 
    
    
      <span className="call-to-action__header">{t("You don't have any active empoloyments yet, you will need to contact your provider if you think you should have a profile")
      }</span>
    
    : 

      <>
     <h3>{t("my_profiles")}</h3>
      {profiles?.map((profile) => (
        <StaffProfileItem
          key={profile?.id}
          staff ={profile?.staff}
          staffId ={profile?.staff_id}
          providerID={profile?.provider_id}
          provider={profile?.provider}
    
        />
      ))}

      </>
    }
    
    </div>
  );
}

export default StaffProfiles;
