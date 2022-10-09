import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Outlet,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import NavMenu from "../../components/ui/NavMenu";
import register from "../../assets/images/register.svg";

function ProviderLayout() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const getPath = () => {
    const locationArray = location.pathname.split("/");

    if (locationArray.includes("patient-record")) {
      return "record";
    }
    else if(locationArray.length === 3){
      return "home"
    }
  };


  return (
    <>
      <Navbar>
      {getPath() != "home" && 
        <NavLink className="" to={`/provider/${id}`}>
          {t("home")}
        </NavLink>
      }
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
            {
              name: t("manage_patients"),

              func: () => {
                navigate(`/provider/${id}/manage-patients`);
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

        {localStorage.getItem("patient_id") && (
          <NavLink
            className=""
            to={`/provider/${id}/patient-record/${localStorage.getItem(
              "patient_id"
            )}`}
          >
            {t("opened patient")}
          </NavLink>
        )}
      </Navbar>

      <div className={getPath() === "record" ? null : "main_page_under_nav"}>
        <Outlet />
      </div>
    </>
  );
}

export default ProviderLayout;
