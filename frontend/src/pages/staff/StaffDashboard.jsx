import React, { useContext, useState } from "react";

import StaffProfiles from "./StaffProfiles";
import "./staff.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StaffProfileItem from "./StaffProfileItem";

import { StaffContext } from "./StaffContext";
import TelephoneDisplay from "../../components/telephoneNew/TelephoneDisplay";
import { updateStaffTelephoneList } from "./staffApi";

function StaffDashboard() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [updating, setUpdating] = useState(false);

  const {profiles, ownedProvider, staffProfile, telephoneNumbers } =
    useContext(StaffContext);

  return (
    <>
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
          <input
            type="button"
            className="page_button page_button-width-small-fixed "
            value={updating ? t("save") : t("update")}
            onClick={() => {
              setUpdating((prev) => !prev);
            }}
          />
        </div>

        <div className="primary--page-box">
        <TelephoneDisplay
          apiUpdate={(data) => {
            updateStaffTelephoneList({
              staff_id: 1,
              data: data,
            });
          }}
          telephone_numbers_list={telephoneNumbers}
        />
        </div>

        {!!ownedProvider ? (
          <div className="primary--page-box">
            <h2 className="margin_bottom_small"> {t("your_clinic")}</h2>

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

          <StaffProfiles 
            profiles = {profiles}
          />
        </div>
      </div>
    </>
  );
}

export default StaffDashboard;
