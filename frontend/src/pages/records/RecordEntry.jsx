import React, { useState } from "react";
import { createRecord } from "./apiCalls/recordsApiCalls";
import { useRecordContext } from "./context/RecordContextHook";
import { useTranslation } from "react-i18next";
import Icd from "../../externalapis/icd-10/Icd";
function RecordEntry(props) {
  const { patient, patientId } = useRecordContext();
  const { t } = useTranslation();
  const [recordEntry, setRecordEntry] = useState({
    history: "",
    examination: "",
    diagnosis: "",
    plan: "",
    // is_public: true,
  });

  const handleSubmit = (is_public) => {
    if (
      recordEntry.history === "" &&
      recordEntry.examination === "" &&
      recordEntry.diagnosis === "" &&
      recordEntry.plan === ""
    ) {
      const confirm = window.confirm(
        t("are_you_sure_you_want_to_save_an_empty_record")
      );
      console.log(is_public);
      if (confirm) {
        createRecord(patient.id, recordEntry, is_public);
        props.addRecord((prev) => {
          return [...prev, { ...recordEntry, is_public: is_public }];
        });
      }
    } else {
      createRecord(patient.id, recordEntry, is_public);
      props.addRecord((prev) => {
        return [...prev, { ...recordEntry, is_public: is_public }];
      });
    }
  };

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
    <div
      className="record_entry"
      style={{ display: props.showConsultationBox ? "flex" : "none" }}
    >
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
          name="plan"
          onChange={handleChange}
        />
      </div>

      <div className="record_entry__footer">
        <input
          className="record_entry__button"
          type="button"
          value={t("save_localy")}
          onClick={() => {
            // setRecordEntry((prev) => {
            //   return { ...prev, is_public: false };
            // });
            handleSubmit(false);

            // createRecord(patient.id, recordEntry);
            // props.addRecord((prev) => {
            //   return [...prev, recordEntry];
            // });
          }}
        />
        <input
          className="record_entry__button"
          type="button"
          value={t("save_and_share")}
          onClick={() => {
            handleSubmit(true);

            // createRecord(patient.id, recordEntry);
            // props.addRecord((prev) => {
            //   return [...prev, recordEntry];
            // });
          }}
        />
      </div>
      <Icd />
    </div>
  );
}

export default RecordEntry;
