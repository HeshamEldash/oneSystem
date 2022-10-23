import React, { useState, useEffect } from "react";
import { useRecordContext } from "./context/RecordContextHook";
import { useTranslation } from "react-i18next";
import { getIcdList } from "./apiCalls/recordsApiCalls";
import bin from "../../assets/images/bin.svg";

function RecordPastIcd() {
  const { t } = useTranslation();
  const { patientId } = useRecordContext();
  const [icdList, setIcdList] = useState([]);

  const getIcdCodes = async () => {
    if (patientId == null) return;
    const icdData = await getIcdList(patientId);
    setIcdList(icdData);
  };
  useEffect(() => {
    getIcdCodes();
  }, [patientId]);
  return (
    <div>
      {icdList.map((condition, index) => {
        return (
          <div key={condition.id || index} className="condition_box">
            <span className="condition_text">{condition.selectedText}</span>
            <span className="condition_details">{condition.title}</span>
            <span className="condition_date">
              {t("date_diagnosed") + ": "}
              {condition.date_recorded}
            </span>

            <span className="condition_icd">
              {t("icd_code") + ": "}
              {condition.code}
            </span>


            <div className="condition_box--utils">
              {condition.id && (
                <img
                  className="svg30 svg_cursor svg_hover"
                  src={bin}
                  alt="delete Logo"
                //   onClick={() => handleDelete(condition.id)}
                />
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default RecordPastIcd;
