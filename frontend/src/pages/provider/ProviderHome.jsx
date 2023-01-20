import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Circle from "../../components/Circle";
import { AppointmentContext } from "../appointments/AppointmentsContext";
import BranchDisplayBox from "./branches/BranchDisplayBox";
import { ProviderContext } from "./context/ProviderContext";
import "./provider.css";

function ProviderHome() {
  const { t } = useTranslation();
  const { profile, branches } = useContext(ProviderContext);
  const { todayAppts } = useContext(AppointmentContext);
  const navigate = useNavigate();

  return (
    <div className="provider-home-mhain">
      <div className="primary--page-box">
        <h1>{profile?.name}</h1>
      </div>
      <div className="primary--page-box">
        <h2>{t("Appointments Today")}</h2>
        <div className="flex-row inner-page-box--flex-row flex-ai-center flex-jc-space-between">
          <Circle>{todayAppts?.length}</Circle>
          <input
            type="button"
            value={t("apointment_panel")}
            onClick={() => navigate("appointments")}
            className="page_button page_button-width-small-fixed page_button-padding-inline-small "
          />
        </div>
      </div>
      <div className="primary--page-box">
        <h2>bracnhes</h2>
        {branches?.map((branch) => {
          return <BranchDisplayBox key={branch.id} branch={branch} />;
        })}
      </div>
    </div>
  );
}

export default ProviderHome;
