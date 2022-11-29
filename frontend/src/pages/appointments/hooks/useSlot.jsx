import React, { useEffect, useState } from 'react'
import APIENDPOINT from '../../../utils/api_calls/apiEndpoint'

function useSlot(slotDetails) {
 const token = JSON.parse(localStorage.getItem("authTokens"));
const [appointmentDetails, setAppointmentDetails]= useState(slotDetails.appointment ?slotDetails.appointment :null  )    
const [status, setStatus] = useState({
    empty:true,
    blocked:false,
    booked:false,
    arrived:false,
})

const [patientDetails, setPatientDetails] = useState()
const [presentation, setPresentation] = useState("")


const deleteAppointment = ()=>{  
    let response =  fetch(
        `${APIENDPOINT}/appointments/appointment?` +
          new URLSearchParams({ slot_id:slotDetails.id  }),
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(token.access),
          },
        }
      );

    setAppointmentDetails({})


}

const blockSlot = ()=>{
    if (status.booked === true){
        return 
    }

    setStatus({...status, empty:true, blocked:true })
}

useEffect(()=>{
    if (appointmentDetails){
        setStatus({...status, empty:false, booked:true })
        setPatientDetails(appointmentDetails.patient)
    }



},[])

  return {
    appointmentDetails,
    status,
    patientDetails,
    deleteAppointment,
    blockSlot
}
}

export default useSlot
