import React, {useState} from "react";
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
import document from "../../assets/images/document.svg";
import SubClinbicalTree from "./components/SubClinbicalTree";

function RecordsClinicalTree({setShowPrescriptions}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { patient_id } = useParams();
  const [showMedicationSubTree, setShowMedicationSubTree] = useState(false)

  const handleClick = (navDestination, openFunc)=>{
    navigate(navDestination)
    setShowMedicationSubTree(false)
    openFunc && openFunc(true)
  }

  return (
    <div className="clincal_tree" id="ct1">
      <div
        className="clnical_tree__component"
        onClick={() =>handleClick("profile")}
      >
        <img src={profile} alt="profile Logo" />

        {t("Profile")}
      </div>

      <div className="clnical_tree__component" onClick={() => handleClick("")}>
        <img src={records} alt="records Logo" />
        {t("main_record")}
      </div>
      <div
        className="clnical_tree__component twelevth-medications"
        onClick={() => {handleClick("medications",setShowMedicationSubTree )
        // setShowPrescriptions(false)
        }}
      >
        <img src={pills} alt="medications Logo" />

        {t("medications")}
      </div>

      {showMedicationSubTree &&   <SubClinbicalTree 
        setShowPrescriptions={setShowPrescriptions}
      /> }
   


      <div className="clnical_tree__component" onClick={() => handleClick("")}>
        <img src={injection} alt="vaccines Logo" />

        {t("vaccines")}
      </div>
      <div
        className="clnical_tree__component eighteenth-past-history"
        onClick={() => handleClick("past-history")}
      >
        <img src={history} alt="history Logo" />

        {t("past history")}
      </div>
      <div className="clnical_tree__component" onClick={() => handleClick("")}>
        <img src={plan} alt="plan Logo" />

        {t("plans")}
      </div>

      <div className="clnical_tree__component" onClick={() => handleClick("")}>
        <img src={investigations} alt="investigations Logo" />
        {t("pathology")}
      </div>

      <div
        className="clnical_tree__component nighnteenth-documents"
        onClick={() =>handleClick("files")}
      >
        <img src={document} alt="document Logo" />
        {t("documents")}
      </div>
    </div>
  );
}

export default RecordsClinicalTree;
