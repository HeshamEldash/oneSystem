import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { formatDate } from "./utils/datetimeUtils";

function BookAppointment({ clincian, slot, session }) {
  const patient_id = localStorage.getItem("patient_id");

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "white",
    borderRadius: "4px",
    boxShadow: 10,
    p: 3,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="book_appointment_box">
          <div>
            <label>Patient</label>
            <span className="form-fields"> {patient_id && patient_id} </span>
          </div>

          <div>
            <label>Start</label>
            <span className="form-fields">{slot?.planned_start}</span>
            <label>Duration</label>
            <span className="form-fields">{slot?.slot_duration}</span>

            <label>Date</label>
            <span className="form-fields">{formatDate(session.start).dateStr}</span>
          </div>
          <div>
            <label>Clinic</label>
            <span>{session?.clinician}</span>
          </div>
          <div>
            <label>Presentation</label>
            <input type="text" className="form-fields"/>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default BookAppointment;
