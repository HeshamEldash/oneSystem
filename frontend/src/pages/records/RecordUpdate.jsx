import React, { useState } from "react";
import { createRecord, updateRecord } from "./apiCalls/recordsApiCalls";
import { useRecordContext } from "./context/RecordContextHook";

function RecordUpdate(props) {
  const { patient } = useRecordContext();

  const [recordEntry, setRecordEntry] = useState({
    history: props.history,
    examination: props.examination,
    diagnosis: props.diagnosis,
    plan: props.plan,
    is_public: props.isPublic,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "history") {
      setRecordEntry((prev) => {
        return { ...prev, history: value };
      });
    } else if (name === "examination") {
      setRecordEntry((prev) => {
        return { ...prev, examination: value };
      });
    } else if (name === "diagnosis") {
      setRecordEntry((prev) => {
        return { ...prev, diagnosis: value };
      });
    } else if (name === "plan") {
      setRecordEntry((prev) => {
        return { ...prev, plan: value };
      });
    }
  };

  return (
    <div className="record_entry" style={{ display: "flex" }}>
      <div className="record_entry__segment">
        <span className="record__entry_begining">Hx:</span>
        <textarea
          className="record_entry__input"
          value={recordEntry.history}
          name="history"
          onChange={handleChange}
        />
      </div>
      <div className="record_entry__segment">
        <span className="record__entry_begining">Ex:</span>
        <textarea
          className="record_entry__input"
          value={recordEntry.examination}
          name="examination"
          onChange={handleChange}
        />
      </div>
      <div className="record_entry__segment">
        <span className="record__entry_begining">Dx:</span>
        <textarea
          className="record_entry__input"
          value={recordEntry.diagnosis}
          name="diagnosis"
          onChange={handleChange}
        />
      </div>
      <div className="record_entry__segment">
        <span className="record__entry_begining">Mx:</span>
        <textarea
          className="record_entry__input"
          value={recordEntry.plan}
          name="plan"
          onChange={handleChange}
        />
      </div>

      <div className="record_entry__footer">
        <input
          className="record_entry__button"
          type="button"
          value="save_localy"
          onClick={() => {
            setRecordEntry((prev) => {
              return { ...prev, is_public: false };
            });
            updateRecord(props.recordId, recordEntry, false);
            props.closeModal();
            props.updateParent({...recordEntry, is_public:false})
          }}
        />

        <input
          className="record_entry__button"
          type="button"
          value="save_and_share"
          onClick={() => {
            setRecordEntry((prev) => {
              return { ...prev, is_public: true };
            });
            updateRecord(props.recordId, recordEntry, true);
            props.closeModal();
            props.updateParent({...recordEntry, is_public:true})
          }}
        />
      </div>
    </div>
  );
}

export default RecordUpdate;
