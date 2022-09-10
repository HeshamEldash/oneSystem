import React from "react";
import { useRecordContext } from "./context/RecordContextHook";
import RecordDisplay from "./RecordDisplay";
function RecordFeed(props) {
  const { records } = useRecordContext();

  return (
    <div className="record_feed">
      {props.children}
      {records?.map((record, index) => {
        return (
          <RecordDisplay
            key={record.id}
            author={record.author_name}
            isPublic = {record.is_public}
            dateCreated={record.date_created}
            history={record.history}
            examination={record.examination}
            diagnosis={record.diagnosis}
            plan={record.managment_plan}
          />
        );
      })}
    </div>
  );
}

export default RecordFeed;
