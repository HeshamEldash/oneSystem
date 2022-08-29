import React,  { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Outlet,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import NavMenu from "../../components/ui/NavMenu";
import SideBar from "../../components/ui/SideBar";
function ProviderLayout() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="page-container">
      {/* <SideBar/> */}
      <Navbar>
        {/* <NavMenu
          buttonName={t("manage_patients")}
          menyItems={[
            {
              name: t("register_staff"),
              func: () => navigate("/provider/${id}/patient-registration"),
            },
          ]}
        ></NavMenu> */}
        <NavLink className="" to={`/provider/${id}/patient-registration`}>
      {t("register_a_patient")}
      </NavLink>
      <br/>
        {/* <NavMenu
          buttonName={t("manage_profile")}
          menyItems={[
            {
              name: t("update_profile"),
              func: () => navigate(`/provider/${id}/profile-update`),
            },
          ]}
        ></NavMenu> */}

        <NavLink className="" to={`/provider/${id}/profile-update`}>
          {t("update_profile")}
        </NavLink>

        {/* <NavMenu
          buttonName={t("manage_sta")}
          menyItems={[
            {
              name: t("register_staff"),
              func: () => navigate(`/provider/${id}/register-staff`),
            },
            {
              name: t("manage_staff "),
              func: () => navigate(`/provider/${id}/manage-staff`),
            },
          ]}


        ></NavMenu> */}

        <NavLink className="" to={`/provider/${id}/register-staff`}>
          {t("register_staff")}
        </NavLink> 

         <NavLink className="" to={`/provider/${id}/manage-staff`}>
          {t("manage_staff")}
        </NavLink>

      </Navbar>

      <Outlet />
    </div>
  );
}

export default ProviderLayout;
