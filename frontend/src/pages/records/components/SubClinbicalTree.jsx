import React from "react";

function SubClinbicalTree({ setShowPrescriptions }) {



  return (
    <div className="sub_clincal_tree">
      <div
        className="sub_clincal_tree--component"
        onClick={()=>setShowPrescriptions(false)}
      >
        Regular Medications
      </div>
      <div
        className="sub_clincal_tree--component"
        onClick={()=>setShowPrescriptions(true)}
      >
        Prescriptions
      </div>
    </div>
  );
}

export default SubClinbicalTree;
