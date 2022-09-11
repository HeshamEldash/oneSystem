import React, { useState, useContext } from "react";
import SideBar from "../../components/ui/SideBar";
import RecordDisplay from "./RecordDisplay";
import RecordEntry from "./RecordEntry";
import { useTranslation } from "react-i18next";
import { RecordContext } from "./context/RecordContext";
import RecordFeed from "./RecordFeed";
import data from "./example";
import RecordPatientDetailsBox from "./RecordPatientDetailsBox";
import RecordsClinicalTree from "./RecordsClinicalTree";
import { RecordContextProvider } from "./context/RecordContext";
import { useRecordContext } from "./context/RecordContextHook";

export default function RecordLayout() {
  const { t } = useTranslation();

  const [showConsultationBox, setShowConsultationBox] = useState(true);
  const [newRecords, setNewRecords] = useState([]);

  return (
    <RecordContextProvider>
      <div className="record_layout">
        <RecordsClinicalTree />

        <RecordPatientDetailsBox />

        <div className="content">
          <div className="action_bar">
            <div
              className="action_bar__element"
              onClick={() => {
                setShowConsultationBox((prev) => !prev);
              }}
            >
              {t("consultation")}
            </div>
          </div>

          <RecordEntry
            showConsultationBox={showConsultationBox}
            addRecord={setNewRecords}
          />

          <RecordFeed>
            {newRecords?.map((record, index) => {
              return (
                <RecordDisplay
                  key={index}
                  isPublic={record.is_public}
                  dateCreated={record.date_created}
                  history={record.history}
                  examination={record.examination}
                  diagnosis={record.diagnosis}
                  plan={record.managment_plan}
                />
              );
            }).reverse()}
          </RecordFeed>
        </div>
      </div>
    </RecordContextProvider>
  );
}
