import React, { useContext } from "react";
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
import { ProviderContext } from "./context/ProviderContext";

function ProviderLayout() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user_perms } = useContext(ProviderContext);

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
            to={`/app/provider/${id}`}
          >
            <img style={{ fill: "white" }} src={home} alt={t("home")} />
          </NavLink>
        )}

        <NavLink className="" to={`/app/provider/${id}/search-patient`}>
          <div className="nav_content">
            {/* <SearchOutlinedIcon /> */}
            {t("search_patients")}
          </div>
        </NavLink>

        {localStorage.getItem("patient_id") && (
          <NavLink
            className=""
            to={`/app/provider/${id}/patient-record/${localStorage.getItem(
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
                navigate(`/app/provider/${id}/patient-registration`);
              },
            },
            {
              name: t("search_patients"),

              func: () => {
                navigate(`/app/provider/${id}/search-patient`);
              },
            },
            {
              name: t("manage_patients"),

              func: () => {
                navigate(`/app/provider/${id}/manage-patients`);
              },
            },
          ]}
        ></NavMenu>

        {user_perms.isManager && (
          <NavMenu
            buttonName={t("Settings")}
            menuItems={[
              {
                name: t("update_profile"),
                func: () => {
                  navigate(`/app/provider/${id}/profile-update`);
                },
              },
              {
                name: t("manage_staff"),

                func: () => {
                  navigate(`/app/provider/${id}/manage-staff`);
                },
              },
            ]}
          ></NavMenu>
        )}

        <NavMenu
          buttonName={t("appointments")}
          menuItems={[
            {
              name: t("appointments_panel"),
              func: () => {
                navigate(`/app/provider/${id}/appointments`);
              },
            },
            {
              name: t("clinic-create"),

              func: () => {
                navigate(`/app/provider/${id}/appointments/clinic-create`);
              },
            },
            {
              name: t("scheduler"),

              func: () => {
                navigate(
                  `/app/provider/${id}/appointments/appointment-scheduler`
                );
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
