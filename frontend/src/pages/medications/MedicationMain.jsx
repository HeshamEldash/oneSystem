import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { useRecordContext } from "../records/context/RecordContextHook";
import MedicationPrescribePanel from "./MedicationPrescribePanel";
import Medicine from "./Medicine";
import RegularMedication from "./RegularMedication";

function MedicationMain() {
  const { showMedicationPanel, showPresciptions } = useOutletContext();
  const { allPrescriptions, regularMedications } = useRecordContext();
  const [newMeds, setNewMeds] = useState([]);

  return (
    <div className="medications_main">
      <MedicationPrescribePanel
        showMedicationPanel={showMedicationPanel}
        setParent={setNewMeds}
      />
      {!showPresciptions ? (
        <div className="">
          <h2> Regular Medications</h2>
          {regularMedications?.map((medication) => {
            return <RegularMedication key={medication.id} medication={medication} />;
          })}
          {newMeds?.map((medication) => {
            return (
              medication.is_regular && (
                <RegularMedication 
                key={medication.id}
                medication={medication} />
              )
            );
          })}
        </div>
      ) : (
        <>
               <h2>Prescriptions</h2>
          {allPrescriptions?.map((px) => {
            return (
              <div key ={px.id} className="prescription_box">
       
              <span>Date: </span>{new Date(px.date_created).toJSON().slice(0,10).replace(/-/g,'/')}
                {px.medications?.map((med, index) => {
                  return (
                    <div>

                      <span style={{paddingInlineEnd:"0.2rem", fontWeight:"bold"}}>Medication {index + 1}:</span>
                      <span style={{paddingInlineEnd:"2rem"}} >{med.name}</span>

                      <span style={{paddingInlineEnd:"0.2rem", fontWeight:"bold"}}>Dose:</span>
                      <span style={{fontWeight:"bold"}}>{med.dose}</span>
             
                    </div>
                  );
                })}
              </div>
            );
          })}
          {newMeds.length > 0 && <div className="prescription_box">
            {newMeds?.map((med) => {
              return (
                <div>
                  {new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                  {med.name}
                  {med.dose}
                </div>
              );
            })}
          </div>}

        </>
      )}
    </div>
  );
}

export default MedicationMain;
