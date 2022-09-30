import React, { useRef, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icd from "../../externalapis/icd-10/Icd";
import { useRecordContext } from "./context/RecordContextHook";

import AddPastCondition from "./components/AddPastCondition";
import {
  getPastCoditions,
  deletePastCodition,
} from "./apiCalls/recordsApiCalls";
import deleteColored from "../../assets/images/deleteColored.svg";

function RecordPastHistory() {
  const { t } = useTranslation();
  const { patient } = useRecordContext();
  const { showAddMedicalConditionBox } = useOutletContext();
  const [conditions, setCondition] = useState([]);

  const getConditions = async () => {
    const data = await getPastCoditions(patient.id);
    setCondition(data);
    console.log(data);
  };
  useEffect(() => {
    getConditions();
  }, [patient]);

  const handleDelete = (id) => {
    setCondition((prev) => {
      return prev.filter((cond) => {
        return cond.id != id;
      });
    });

    deletePastCodition(patient.id, id);
  };
  return (
    <div className="record_main_box">
      {showAddMedicalConditionBox && (
        <AddPastCondition updateParent={setCondition} />
      )}
      {conditions.length ===0 && <div  className="condition_text">
         {t("No recorded medical conditions")}
      </div>}


      {conditions?.map((condition, index) => {
        return (
          <div
            key={condition.id || index}
            className="condition_box"
            onSelect={(e) => {
              console.dir(e.target);
            }}
          >
            <span className="condition_text">{condition.condition}</span>
            <span className="condition_date">
              {t("date_diagnosed") + ": "}
              {condition.date_diagnosed}
            </span>
            <span className="condition_icd">
              {t("icd_code") + ": "}
              {condition.icd_code}
            </span>
            <div className="condition_box--utils">
              {condition.id && (
                <img
                  className="svg_icon_large"
                  src={deleteColored}
                  alt="delete Logo"
                  onClick={() => handleDelete(condition.id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecordPastHistory;
