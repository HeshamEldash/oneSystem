
import React, {
  useState,
  useContext,
} from "react";
import ContextMenu from "../../components/ContextMenu";
import ContextMenuItem from "../../components/ContextMenuItem";
import useSlot from "./hooks/useSlot";
import { formatMinutes, formatTime } from "./utils/datetimeUtils";
import { useNavigate } from "react-router-dom";
import { ProviderContext } from "../provider/context/ProviderContext";
import BookAppointment from "./BookAppointment";

function Slot({ slotDetails, session }) {
  const { providerId } = useContext(ProviderContext);
  const { appointmentDetails, status,setStatus,  deleteAppointment, blockSlot,setAppointmentDetails, slotInfo, setSlotInfo } =
    useSlot(slotDetails);
  const navigate = useNavigate();
  const [openBookAppointment, setOpenBookAppointment] = useState(false);



  return (
    <div
      id={slotInfo.id}
      className="slot"
      onDoubleClick={
        appointmentDetails?.patient
          ? () => {
              navigate(
                `/app/provider/${providerId}/patient-record/${appointmentDetails.patient}`
              );
            }
          : null
      }
    >
      <ContextMenu targetId={slotInfo.id}>
        <ContextMenuItem
          name={"Book appointment"}
          func={() => setOpenBookAppointment(prev => true)}
        />
        <ContextMenuItem name={"Cancel"} func={() => deleteAppointment()} />
        <ContextMenuItem
          name={status.blocked ? "unblock" : "block"}
          func={() => blockSlot()}
        />
        {/* <ContextMenuItem name={"Status"} func={() => console.log("au KAlam")} />
        <ContextMenuItem
          name={"Information"}
          func={() => console.log("au KAlam")}
        /> */}
      </ContextMenu>

      <div className="slot__date-timebox">
        <span>{formatTime(slotInfo.planned_start)}</span>
        <span>{formatMinutes(slotInfo.slot_duration)} m</span>
      </div>

      <div className="slot__details">
        {status.booked && (
          <>
            <span>{appointmentDetails?.patient_name}</span>
            <span>{appointmentDetails?.presentation}</span>
          </>
        )}
      </div>

      <div className={`slot_status ${status.blocked && "blocked"}`}>
        {status.blocked && <span>blocked</span>}
      </div>

      {openBookAppointment && (
        <BookAppointment slot={slotInfo} session={session} 
        setSlotStatus = {setStatus}
        setAppointment ={setAppointmentDetails}

        />
      )}
    </div>
  );
}

export default Slot;
