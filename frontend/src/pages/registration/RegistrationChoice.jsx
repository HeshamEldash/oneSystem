import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import clinic from "../../assets/images/clinic.svg";
import doctor from "../../assets/images/doctor3.svg";
import usersvg from "../../assets/images/user2.svg";
import RegCard from "./components/RegCard";

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
                <RegCard
                  title={t("Register a clinic")}
                  img={clinic}
                  link={"/register/staff"}
                  text={"Register a clinic"}
                />
                <RegCard
                  title={t("Register an individual")}
                  img={doctor}
                  link={"/registration/staff"}
                  text={"Register an individual"}
                />
              </div>
            </div>
          </div>
          <div className="regsitration_choice--footer"></div>
        </div>
      )}
    </>
  );
}

export default RegistrationChoice;

//  pt registraction card

{
  /* <div className="card">
                <h3>{t("Register a user")}</h3>
                <img src={usersvg} />

                <Link
                  className="registration_page_button"
                  to="/register/patient"
                  style={{ display: "block" }}
                >
                  {t("Register a user")}
                </Link>
              </div> */
}
