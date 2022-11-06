import React, { useEffect, useState } from "react";
import { getUserMedicationPresets } from "./medicationsApiCalls";

function MedicationPresetPanel({setPrescribedList,isRegular}) {
  const [presets, setPresets] = useState([]);
  const getPresetData = async () => {
    const prests = await getUserMedicationPresets();
    console.log(prests);
    setPresets(prests);
  };

  useEffect(() => {
    getPresetData();
  }, []);

  return (
    <div
      className="preset_panel margin_top_small inner-page-box padding1 medications_results_box"
      style={{ width: "100%" }}
    >
      {presets?.map((preset, index) => {
        return (
          <div 
          key={index}
          onClick={()=>setPrescribedList((prev)=>[...prev, {...preset.medication, is_regular:isRegular}])}
          className="medication_main padding_inline-small cursor_pointer light_border_bottom shallow_shadow padding_block_small margin_bottom_small" key={preset.id}>
            <div>
              <span style={{paddingInlineEnd:"0.5rem"}}>Medication:</span>
              <span>{preset.medication.name}</span>
            </div>

            <div>
              <span style={{paddingInlineEnd:"0.5rem"}} >Dose</span>
              <span>{preset.medication.dose}</span>
            </div>
          
       

           
          </div>
        );
      })}
    </div>
  );
}

export default MedicationPresetPanel;
