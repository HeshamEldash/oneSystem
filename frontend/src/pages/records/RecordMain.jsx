import React, { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RecordDisplay from "./RecordDisplay";
import RecordEntry from "./RecordEntry";
import RecordFeed from "./RecordFeed";

function RecordMain() {
  const [newRecords, setNewRecords] = useState([]);
  const { t } = useTranslation();
  const { showConsultationBox } = useOutletContext();

  return (
    <>
      <RecordEntry
        showConsultationBox={showConsultationBox}
        addRecord={setNewRecords}
      />

      <RecordFeed>
        {newRecords
          ?.map((record, index) => {
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
          })
          .reverse()}
      </RecordFeed>
    </>
  );
}

export default RecordMain;
