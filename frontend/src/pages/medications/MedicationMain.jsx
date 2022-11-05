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
            return <RegularMedication medication={medication} />;
          })}
          {newMeds?.map((medication) => {
            return (
              medication.is_regular && (
                <RegularMedication medication={medication} />
              )
            );
          })}
        </div>
      ) : (
        <>
          {allPrescriptions?.map((px) => {
            return (
              <div className="prescription_box">
                {px.date_created}
                {px.medications?.map((med) => {
                  return (
                    <div>
                      {med.name}
                      {med.dose}
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
