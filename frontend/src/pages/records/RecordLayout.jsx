import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RecordPatientDetailsBox from "./RecordPatientDetailsBox";
import RecordsClinicalTree from "./RecordsClinicalTree";
import { RecordContextProvider } from "./context/RecordContext";
import RecordActionBar from "./RecordActionBar";
import { Outlet, useNavigate, useParams } from "react-router";
import useCurrentPath from "./hooks/useCurrentRecordLocation";
import Tooltip from "@mui/material/Tooltip";
import pills from "../../assets/images/pills.svg";

export default function RecordLayout() {
  const { t } = useTranslation();
  const [showConsultationBox, setShowConsultationBox] = useState(true);
  const [showAddMedicalConditionBox, setShowAddMedicalConditionBox] =
    useState(false);
  const [upload, setUpload] = useState(false);
  const [showMedicationPanel, setShowMedicationPanel] = useState(false);
  const [showPresciptions, setShowPrescriptions] = useState(false);

  const navigate = useNavigate();
  const [newRecords, setNewRecords] = useState([]);
  const path = useCurrentPath();
  const { id } = useParams();

  const handleCloseRecord = () => {
    navigate(`/app/provider/${id}`);
    localStorage.removeItem("patient_id");
    localStorage.removeItem("patient_name");
  };

  return (
    <RecordContextProvider>
      <div className="record_layout">
        <div className="record_body_container">
          <div className="record_side-content">
            <RecordPatientDetailsBox />
            <RecordsClinicalTree setShowPrescriptions={setShowPrescriptions} />
          </div>

          <div className="content">
          
            <RecordActionBar
              items={[
                {
                  name: t("close record"),
                  func: () => handleCloseRecord(),
                },
              ]}
            >
              {path === "record" && (
                <div
                  className="action_bar__element"
                  onClick={() => setShowConsultationBox((prev) => !prev)}
                >
                  {t("consultation")}
                </div>
              )}

              {path === "past-history" && (
                <div
                  className="action_bar__element"
                  onClick={() => setShowAddMedicalConditionBox((prev) => !prev)}
                >
                  {t("add_pmh")}
                </div>
              )}

              {path === "files" && (
                <div
                  className="action_bar__element"
                  onClick={() => setUpload((prev) => !prev)}
                >
                  {t("Add File")}
                </div>
              )}

              {path === "medications" && (
                <div
                  className="action_bar__element thighrteenth-medication-prescribe"
                  onClick={() => setShowMedicationPanel((prev) => !prev)}
                >
                  <Tooltip title="Prescribe">
                    <img
                      className="svg20 margin_inline-small "
                      src={pills}
                      alt="medications Logo"
                    />
                  </Tooltip>
                </div>
              )}
            </RecordActionBar>

            <main className="">
              <Outlet
                context={{
                  showConsultationBox,
                  setNewRecords,
                  newRecords,
                  showAddMedicalConditionBox,
                  upload,
                  showMedicationPanel,
                  showPresciptions,
                  setShowPrescriptions,
                }}
              />
            </main>
          </div>
        </div>
      </div>
    </RecordContextProvider>
  );
}
