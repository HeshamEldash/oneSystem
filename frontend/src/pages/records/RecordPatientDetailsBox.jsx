import React from "react";
import { useTranslation } from "react-i18next";
import { useRecordContext } from "./context/RecordContextHook";
function RecordPatientDetailsBox() {
  const { t } = useTranslation();

  const { patient } = useRecordContext();

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="details_box">
      <div className="details_box__component">
        <p className="details_box__titles">{t("patient_name")}:</p>
        <p>
          {" "}
          {patient?.first_name} {patient?.middle_names} {patient?.last_name}
        </p>
      </div>
      <div className="details_box__component">
        <p className="details_box__titles">{t("age")}:</p>
        <p> {getAge(patient?.date_of_birth)}</p>
      </div>
      <div className="details_box__component">
        <p className="details_box__titles">{t("date_of_birth")}:</p>
        <p> {patient?.date_of_birth}</p>
      </div>
      <div className="details_box__component">
        <p className="details_box__titles">{t("gender")}:</p>
        <p> {patient?.gender}</p>
      </div>
      <div className="details_box__component">
        <p className="details_box__titles">{t("telephone_number")}:</p>
    

        { patient?.telephone_numbers?.length > 0 && 
            <p>{patient?.telephone_numbers[0]?.telephone_number}</p>
        }
        
      

        
      </div>
      <div className="details_box__component">
        <p className="details_box__titles">{t("address")}:</p>
 
        <p>
          {patient?.address?.unit_number}, {patient?.address?.first_line}, {patient?.address?.second_line}, {patient?.address?.city}, {patient?.address?.governorate}
        </p>
    
      </div>
    </div>
  );
}

export default RecordPatientDetailsBox;
