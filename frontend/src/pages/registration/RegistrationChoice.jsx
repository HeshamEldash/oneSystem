import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import clinic from "../../assets/images/clinic.svg";
import doctor from "../../assets/images/doctor3.svg";
import usersvg from "../../assets/images/user2.svg";

function RegistrationChoice() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {user ? (
        navigate("/")
      ) : (
        <div>
        <div className="registration-choice spacer seperator">
          <div>
            <div className="page_top">
              <h1 className="page_title">
                All your healthcare records in one place
              </h1>
              <h3 className="page_subtitle">
                Make your healthcare journy smoother and safer
              </h3>
            </div>

            <div className="cards_section">
              <div className="card">
                <h3>{t("Register a clinic")}</h3>
                <img src={clinic} />

                <Link
                  className="registration_page_button"
                  to="/register/staff"
                  style={{ display: "block" }}
                >
                  {t("Register a clinic")}
                </Link>
              </div>
              <div className="card">
                <h3>{t("Register an individual")}</h3>
                <img src={doctor} />

                <Link
                  className="registration_page_button"
                  to="/registration/staff"
                  style={{ display: "block" }}
                >
                  {t("Register an individual")}
                </Link>
              </div>
              <div className="card">
                <h3>{t("Register a user")}</h3>
                <img src={usersvg} />

                <Link
                  className="registration_page_button"
                  to="/register/patient"
                  style={{ display: "block" }}
                >
                  {t("Register a user")}
                </Link>
              </div>
            </div>
          </div>
          
        </div>
        <div className="regsitration_choice--footer">

        </div>
        </div>
      )}
    </>
  );
}

export default RegistrationChoice;
