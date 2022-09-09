import React, { useState } from "react";
import SideBar from "../../components/ui/SideBar";
import RecordDisplay from "./RecordDisplay";
import RecordEntry from "./RecordEntry";
import { useTranslation } from "react-i18next";

import RecordFeed from "./RecordFeed";
import data from "./example";
export default function RecordLayout() {
  const { t } = useTranslation();

  const [showConsultationBox, setShowConsultationBox] = useState(true);

  return (
    <div className="record_layout">
      <SideBar />

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
            
        />

        <RecordFeed>
          {data.map((record, index) => {
            return <RecordDisplay key={index} 
                history={record.history}
            />;
          })}
        </RecordFeed>
      </div>
    </div>
  );
}
