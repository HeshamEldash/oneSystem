import React, { useState } from "react";
import { createRecord } from "./apiCalls/recordsApiCalls";
import { useRecordContext } from "./context/RecordContextHook";


function RecordEntry(props) {
  const { patient } = useRecordContext();

  const [recordEntry, setRecordEntry] = useState({
    history: "",
    examination: "",
    diagnosis: "",
    plan: "",
    is_public:true,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "history") {
        setRecordEntry((prev)=>{
           return ( {...prev, history: value})
        })
    }
    else if (name === "examination") {
        setRecordEntry((prev)=>{
            return ( {...prev, examination: value})
         })
    }
    else if (name === "diagnosis") {
        setRecordEntry((prev)=>{
            return ( {...prev, diagnosis: value})
         })
    }
    else if (name === "plan") {
        setRecordEntry((prev)=>{
            return ( {...prev, plan: value})
         })
    }
  };

  return (
    <div className="record_entry" 
    style = {{display: props.showConsultationBox ? 'flex' : 'none'}}> 
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
          value={recordEntry.managment}

          name="managment"
          onChange={handleChange}
        />
      </div>

      <div className="record_entry__footer">
        <input
          className="record_entry__button"
          type="button"
          value="save_localy"
          onClick={()=>{
            createRecord(patient.id)
        
          }}
        />
        <input
          className="record_entry__button"
          type="button"
          value="save_and_share"
        />
      </div>
    </div>
  );
}

export default RecordEntry;
