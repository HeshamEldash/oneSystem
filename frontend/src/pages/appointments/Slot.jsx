import { formatTimeStr } from "antd/lib/statistic/utils";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import ContextMenu from "../../components/ContextMenu";
import ContextMenuItem from "../../components/ContextMenuItem";
import useSlot from "./hooks/useSlot";
import { formatMinutes, formatTime } from "./utils/datetimeUtils";
import { useParams, useNavigate } from "react-router-dom";
import { ProviderContext } from "../provider/context/ProviderContext";
import BookAppointment from "./BookAppointment";

function Slot({ slotDetails, session }) {
  const { providerId } = useContext(ProviderContext);
  const { appointmentDetails, status, deleteAppointment, blockSlot } =
    useSlot(slotDetails);
  const navigate = useNavigate();


  const [openBookAppointment, setOpenBookAppointment] = useState(false);
  return (
    <div
      id={slotDetails.id}
      className="slot"
      onDoubleClick={
        appointmentDetails?.patient
          ? () => {
              navigate(
                `/provider/${providerId}/patient-record/${appointmentDetails.patient}`
              );
            }
          : null
      }
    >
      <ContextMenu targetId={slotDetails.id}>
        <ContextMenuItem
          name={"Book appointment"}
          func={() => setOpenBookAppointment(true)}
        />
        <ContextMenuItem name={"Cancel"} func={() => deleteAppointment()} />
        <ContextMenuItem name={"Block"} func={() => blockSlot()} />
        <ContextMenuItem name={"Status"} func={() => console.log("au KAlam")} />
        <ContextMenuItem
          name={"Information"}
          func={() => console.log("au KAlam")}
        />
      </ContextMenu>

      <div className="slot__date-timebox">
        <span>{formatTime(slotDetails.planned_start)}</span>
        <span>{formatMinutes(slotDetails.slot_duration)} m</span>
      </div>

      <div className="slot__details">
        {status.booked && (
          <>
            <span>{appointmentDetails?.patient_name}</span>
            <span>{appointmentDetails?.presentation}</span>
          </>
        )}
      </div>

      <div className="slot_status">
        {status.blocked && <span>blocked</span>}
      </div>


      {openBookAppointment && <BookAppointment

        slot ={slotDetails}
        session={session}
      />}
    </div>
  );
}

export default Slot;
