import React from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { useNavigate, NavLink, useParams } from "react-router-dom";
function RecordsClinicalTree() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { patient_id } = useParams();


  return (
    <div className="clincal_tree" id="ct1">
      <div className="clnical_tree__component" onClick={() => navigate("profile")}>
        {t("profile")}
      </div>

      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("main_record")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("medications")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("vaccines")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("past history")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("plans")}
      </div>
      <div className="clnical_tree__component" onClick={() => navigate("")}>
        {t("pathology")}
      </div>
    </div>
  );
}

export default RecordsClinicalTree;
