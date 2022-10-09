import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import RecordPatientDetailsBox from "./RecordPatientDetailsBox";
import RecordsClinicalTree from "./RecordsClinicalTree";
import { RecordContextProvider } from "./context/RecordContext";
import RecordActionBar from "./RecordActionBar";
import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import useCurrentPath from "./hooks/useCurrentRecordLocation";

export default function RecordLayout() {
  const { t } = useTranslation();
  const [showConsultationBox, setShowConsultationBox] = useState(true);
  const [showAddMedicalConditionBox, setShowAddMedicalConditionBox] =
    useState(false);
  const navigate = useNavigate();
  const [newRecords, setNewRecords] = useState([]);
  const path = useCurrentPath();
  const { id } = useParams();

  const handleCloseRecord = () => {
    navigate(`/provider/${id}`);
    localStorage.removeItem("patient_id");
  };

  return (
    <RecordContextProvider>
      <div className="record_layout">
        <RecordPatientDetailsBox />
        <RecordsClinicalTree />

        <main className="content">
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
            { path === "files" && <div className="action_bar__element">
            {t("Add File")}
            </div>}


          </RecordActionBar>

          <Outlet
            context={{
              showConsultationBox,
              setNewRecords,
              newRecords,
              showAddMedicalConditionBox,
            }}
          />
        </main>
      </div>
    </RecordContextProvider>
  );
}
