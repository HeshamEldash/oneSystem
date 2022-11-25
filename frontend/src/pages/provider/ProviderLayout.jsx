import React from "react";
import { useTranslation } from "react-i18next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Outlet,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import NavMenu from "../../components/ui/NavMenu";
import home from "../../assets/images/home3.svg";

function ProviderLayout() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const getPath = () => {
    const locationArray = location.pathname.split("/");

    if (locationArray.includes("patient-record")) {
      return "record";
    } else if (locationArray.includes("appointments")) {
      return "appointments";
    } else if (locationArray.length === 3) {
      return "home";
    }
  };

  return (
    <>
      <Navbar>
        {getPath() != "home" && (
          <NavLink
            className="page_button-padding-inline-small"
            to={`/provider/${id}`}
          >
            <img style={{ fill: "white" }} src={home} alt={t("home")} />
          </NavLink>
        )}

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

        <NavMenu
          buttonName={t("Settings")}
          menuItems={[
            {
              name: t("update_profile"),
              func: () => {
                navigate(`/provider/${id}/profile-update`);
              },
            },
            {
              name: t("manage_staff"),

              func: () => {
                navigate(`/provider/${id}/manage-staff`);
              },
            },
          ]}
        ></NavMenu>

        <NavMenu
          buttonName={t("appointments")}
          menuItems={[
            {
              name: t("appointments_panel"),
              func: () => {
                navigate(`/provider/${id}/appointments`);
              },
            },
            {
              name: t("clinic-create"),

              func: () => {
                navigate(`/provider/${id}/appointments/clinic-create`);
              },
            },
            {
              name: t("scheduler"),

              func: () => {
                navigate(`/provider/${id}/appointments/appointment-scheduler`);
              },
            },
          ]}
        ></NavMenu>
      </Navbar>

      <div
        className={
          getPath() === "record" || getPath() === "appointments"
            ? null
            : "main_page_under_nav"
        }
      >
        <Outlet />
      </div>
    </>
  );
}

export default ProviderLayout;
