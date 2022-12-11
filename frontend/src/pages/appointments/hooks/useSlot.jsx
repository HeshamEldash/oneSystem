import React, { useEffect, useState } from "react";
import APIENDPOINT from "../../../utils/api_calls/apiEndpoint";
import { updateAppointmentStatus } from "../appointmentsApiCalls";

function useSlot(slotDetails) {
  const BOOKED = "BD";
  const AVAILBLE = "AV";
  const BLOCKED = "BLC";

  const token = JSON.parse(localStorage.getItem("authTokens"));
  const [appointmentDetails, setAppointmentDetails] = useState(
    slotDetails.appointment ? slotDetails.appointment : null
  );
  const [status, setStatus] = useState({
    empty: slotDetails.status === AVAILBLE? true:false,
    blocked: slotDetails.status === BLOCKED? true:false,
    booked: slotDetails.status === BOOKED? true:false,
    arrived: false,
  });

  const [patientDetails, setPatientDetails] = useState();
  const [slotInfo, setSlotInfo] = useState(slotDetails);

  const deleteAppointment = () => {
    let response = fetch(
      `${APIENDPOINT}/appointments/appointment?` +
        new URLSearchParams({ slot_id: slotDetails.id }),
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      }
    );

    setAppointmentDetails(null);
  };

  const blockSlot = () => {
    if (status.booked === true) {
      return;
    }

    setStatus((status) => ({
      ...status,
      empty: true,
      blocked: !status.blocked,
    }));
    status.blocked ?
    
     updateAppointmentStatus(slotDetails.id, AVAILBLE)
    : updateAppointmentStatus(slotDetails.id, BLOCKED);
  };

  useEffect(() => {
    if (appointmentDetails) {
      setStatus({ ...status, empty: false, booked: true });
      setPatientDetails(appointmentDetails.patient);
    }
  }, []);

  return {
    appointmentDetails,
    setAppointmentDetails,
    status,
    setStatus,
    patientDetails,
    deleteAppointment,
    blockSlot,
    slotInfo,
    setSlotInfo,
  };
}

export default useSlot;
