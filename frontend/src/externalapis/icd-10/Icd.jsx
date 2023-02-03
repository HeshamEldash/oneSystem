import React, { useEffect, useState } from "react";
import * as ECT from "@whoicd/icd11ect";
import "@whoicd/icd11ect/style.css";
import { useRecordContext } from "../../pages/records/context/RecordContextHook";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

function Icd() {
  const [entity, setEntity] = useState();
  const { patientId } = useRecordContext();
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const saveIcd = async () => {
    let response = await fetch(
      `${APIENDPOINT}/records/patients-icd-codes/?` +
      new URLSearchParams({ patient_id: patientId }),
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        body: JSON.stringify({
          code: entity.code,
          title: entity.title,
          selectedText: entity.selectedText,
          linearizationUri: entity.linearizationUri,
          foundationUri: entity.foundationUri,
          patient: patientId,
          recorded_by: 1,
        }),
      }
    );
    ECT.Handler.clear("1");
    setEntity({});
  };
  const mySettings = {
    apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
    popupMode: true,
    autoBind: false,
  };

  const myCallbacks = {
    selectedEntityFunction: (selectedEntity) => {
      setEntity(() => selectedEntity);
    },
  };

  useEffect(() => {
    ECT.Handler.configure(mySettings, myCallbacks);
    return 
  }, []);

  useEffect(() => {
    ECT.Handler.bind("1");
  }, [entity]);

  return (
    <div>
      <div className="tetingicd">
        <h3>ICD: </h3>
        <input
          type="text"
          className="ctw-input icdInput"
          autoComplete="off"
          data-ctw-ino="1"
        />
        {entity?.code && <span style={{color:"red"}}>{entity.selectedText} </span>}
        <input className="record_entry__button" type="button" onClick={() => saveIcd()} value="save" />
      </div>
      <div className="ctw-window" data-ctw-ino="1"></div>
    </div>
  );
}

export default Icd;
