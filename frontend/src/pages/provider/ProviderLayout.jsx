import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Outlet,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import NavMenu from "../../components/ui/NavMenu";
import register from "../../assets/images/register.svg"


function ProviderLayout() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>


      <Navbar>
        <NavMenu
          buttonName={t("patients")}
          menuItems={[
            {
              name: t("register_a_patient"),
              func: () => {
                navigate(`/provider/${id}/patient-registration`);
              },
            },
            {
              name: t("search_patients"),

              func: () => {
                navigate(`/provider/${id}/search-patient`);
              },
            },
          ]}
        ></NavMenu>

        <NavLink className="" to={`/provider/${id}/patient-registration`}>
      
          {t("register_a_patient")}
       
        </NavLink>

        <NavLink className="" to={`/provider/${id}/profile-update`}>
          {t("update_profile")}
        </NavLink>

        <NavLink className="" to={`/provider/${id}/manage-staff`}>

          {t("manage_staff")}
        </NavLink>

        <NavLink className="" to={`/provider/${id}/search-patient`}>
          <div className="nav_content">
            <SearchOutlinedIcon />
            {t("search_patients")}
          </div>
        </NavLink>
      </Navbar>

      <Outlet />



    </>
  );
}

export default ProviderLayout;
