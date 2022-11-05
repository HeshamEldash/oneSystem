import React from "react";

function RegularMedication({ medication }) {
  return (
    <div className="regular_medication_box">
      <div style={{fontWeight:"bold"}}> Medication: {medication.name}</div>
      <div> Dose: {medication.dose}</div>
      <div> Date Started: {medication.date_created}</div>
    </div>
  );
}

export default RegularMedication;
