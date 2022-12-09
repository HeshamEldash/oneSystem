import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./provider.css";

function ProviderHome() {
  const { t } = useTranslation();
  const [employedStaff, setEmployedStaff] = useState([]);
  const [image, setImage] = useState();

  // const getAllStaff = async () => {
  //   const response = await fetch(`${APIENDPOINT}/users/staff-list/${id}/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setEmployedStaff(data);
  //   }
  // };

  // useEffect(() => {
  //   getAllStaff();
  // }, []);

  return <div className="provider-home-main">
<div className="primary--page-box">
  
</div>

  </div>;
}

export default ProviderHome;
