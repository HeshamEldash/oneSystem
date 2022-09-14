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
import RecordActionBar from "./RecordActionBar";
import { Outlet } from "react-router";

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
          <RecordActionBar
            items={[
              {
                name: t("consultation"),
                func: () => setShowConsultationBox((prev) => !prev),
              },
            ]}
          ></RecordActionBar>

          <Outlet
            context={{ showConsultationBox, setNewRecords, newRecords }}
          />
        </div>
      </div>
    </RecordContextProvider>
  );
}
