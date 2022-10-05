import React from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import records from "../../assets/images/records.svg";
import pills from "../../assets/images/pills.svg";
import profile from "../../assets/images/profile.svg";
import injection from "../../assets/images/injection.svg";
import history from "../../assets/images/history.svg";
import investigations from "../../assets/images/investigations2.svg";
import plan from "../../assets/images/plan.svg";
// import injection from "../../assets/images/injection.svg";



function RecordsClinicalTree() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { patient_id } = useParams();

  return (
    <div className="clincal_tree" id="ct1">
      <div
        className="clnical_tree__component"
        onClick={() => navigate("profile")}
      >
        <img src={profile} alt="profile Logo" />

        {t("Profile")}
      </div>

      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={records} alt="records Logo" />

        {t("main_record")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={pills} alt="medications Logo" />

        {t("medications")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={injection} alt="vaccines Logo" />

        {t("vaccines")}
      </div>
      <div
        className="clnical_tree__component"
        onClick={() => navigate("past-history")}
      >
      <img src={history} alt="history Logo" />

        {t("past history")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={plan} alt="plan Logo" />

        {t("plans")}
      </div>


      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={investigations} alt="investigations Logo" />
        {t("pathology")}
      </div>

      <div className="clnical_tree__component" onClick={() => navigate("")}>
      <img src={investigations} alt="investigations Logo" />
        {t("documents")}
      </div>








    </div>
  );
}

export default RecordsClinicalTree;
