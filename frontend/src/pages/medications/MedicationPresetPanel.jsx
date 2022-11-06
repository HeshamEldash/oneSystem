import React from 'react'
import { getUserMedicationPresets } from './medicationsApiCalls'

function MedicationPresetPanel() {

    const getPresetData = async ()=>{
       const prests = await getUserMedicationPresets()
       console.log(prests)
    }


  return (
    <div>
      agsdddddddddddddddd
    </div>
  )
}

export default MedicationPresetPanel
