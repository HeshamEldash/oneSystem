import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import StaffProfiles from "./StaffProfiles";
import SideBar from "../../components/ui/SideBar";
import "./staff.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import StaffProfileItem from "./StaffProfileItem";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deletePhoneNumber,
  updatePhoneNumber,
} from "../../utils/api_calls/telephoneApi";
import addSVG from "../../assets/images/add2.svg"
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

function StaffDashboard() {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ownedProvider, setOwnedProvider] = useState();
  const [staffProfile, setStaffProfile] = useState();
  const [telephoneNumbers, setTelephoneNumbers] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  const getOwnedProvider = async () => {
    const response = await fetch(
      `${APIENDPOINT}/users/provider/${user.user_id}?` +
        new URLSearchParams({ owner_id: user.user_id }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      setOwnedProvider(data);
    }
  };


  const addPhone = async () => {
    setTelephoneNumbers((prev) => [...prev, { telephone_number: newPhone }]);
    const response = await fetch(`${APIENDPOINT}/users/staff-profile-detail/${staffProfile.staff_profile.id}/`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        telephone_numbers: [...telephoneNumbers, 
          { telephone_number: newPhone }
        ],
      }),
    });

  };


  const handlePhoneChange = (event) => {
    const num = event.target.value;
    setNewPhone(num);
  };


  const getProfileDetails = async () => {
    const response = await fetch(
      `${APIENDPOINT}/users/staff-account-detail/${user.user_id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setStaffProfile(data);
      setTelephoneNumbers(data.staff_profile.telephone_numbers);
    }
  };




  useEffect(() => {
    getOwnedProvider();
    getProfileDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main_page_under_nav">
        <h1 className="page_header">{t("My Dashboard")}</h1>

        <div className="primary--page-box">
          <h2 className="margin_bottom_small"> {t("profile_information")}</h2>
          <h4 className="subtitle">{t("Name")}:</h4>
          {staffProfile?.staff_profile?.first_name}{" "}
          {staffProfile?.staff_profile?.middle_names}{" "}
          {staffProfile?.staff_profile?.last_name}
          <br />
          <h4 className="subtitle">{t("email")}:</h4>
          {staffProfile?.email}
          <br />
          <h4 className="subtitle">{t("role")}:</h4>
          {staffProfile?.staff_profile?.staff_role}
          <br />
          <h4 className="subtitle">{t("professional_number")}:</h4>
          {staffProfile?.staff_profile?.professional_number}
          <br />
          <h4 className="subtitle">{t("telephone_numbers")}:</h4>
          {updating && (
            <div className={"inner-page-box--flex-row"}>
              <input
                className="form-fields"
                value={newPhone}
                type="text"
                onChange={handlePhoneChange}
              />
              <input
                className="secondry-button"
                onClick={() => {
                  addPhone();
                }}
                type="button"
                value={ "Add"}
              />
          
            </div>
          )}


          {telephoneNumbers?.map((num, index) => {
            return (
              <div key={num.id || index} className={"inner-page-box--flex-row"} style={{ padding: "0.4rem" }}>
                {!updating ? (
                  <> {num.telephone_number}</>
                ) : (
                  <>
                    <input
                      className="form-fields"
                      value={num.telephone_number}
                      type="text"
                      onChange={(e) => {
                        setTelephoneNumbers((prev) => {
                          return prev.filter((number) => {
                            if (number === num) {
                              number.telephone_number = e.target.value;
                            }
                            return telephoneNumbers;
                          });
                        });
                      }}
                    />

                    <input
                      className="secondry-button"
                      type="button"
                      value={t("update")}
                      onClick={() => {
                        updatePhoneNumber(num.id, num.telephone_number);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        deletePhoneNumber(num.id);
                        setTelephoneNumbers((prev) => {
                          return prev.filter((number, index) => {
                            return number.id != num.id;
                          });
                        });
                      }}
                      color="error"
                      style={{ cursor: "pointer", fontSize: "20" }}
                    />
                  </>
                )}
              </div>
            );
          })}

          
          <input
            type="button"
            className="page_button page_button-width-small-fixed "
            value={updating ? t("save") : t("update")}
            onClick={() => {
              setUpdating((prev) => !prev);
              // updating && updateProfile()
            }}
          />


          
        </div>

        {!!ownedProvider ? (
          <div className="primary--page-box">
          <h2 className="margin_bottom_small"> {t("your_clinic")}</h2>

            {/* <h3>{t("my_clinic")}</h3> */}
            <StaffProfileItem
              providerID={ownedProvider?.id}
              provider={ownedProvider?.name}
            />
          </div>
        ) : (
          <div className="primary--page-box">
            <span className="call-to-action__header">
              {t("would you like to register a clinic to your account?")}
            </span>
            <input
              type="button"
              onClick={() => {
                navigate("/register/provider");
              }}
              className="bd"
              value={t("register_a_provider")}
            />
          </div>
        )}

        <div className="primary--page-box">
        <h2 className="margin_bottom_small"> {t("your_profiles")}</h2>

          <StaffProfiles />
        </div>
      </div>
    </>
  );

  // old css changes VVVVVV

  return (
    <>
      <Navbar />
      <div className="staff-dashboard-main">
        <h1>{t("My Dashboard")}</h1>

        {!!ownedProvider ? (
          <div className="primary-container">
            <h3>{t("my_clinic")}</h3>
            <StaffProfileItem
              providerID={ownedProvider?.id}
              provider={ownedProvider?.name}
            />
          </div>
        ) : (
          <div className="call-to-action__box">
            <span className="call-to-action__header">
              {t("would you like to register a clinic to your account?")}
            </span>
            <input
              type="button"
              onClick={() => {
                navigate("/register/provider");
              }}
              className="bd"
              value={t("register_a_provider")}
            />
          </div>
        )}

        <div className="staff-dashboard-inner">
          <StaffProfiles />
        </div>
      </div>
    </>
  );
}

export default StaffDashboard;
