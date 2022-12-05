import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { formatDate, formatMinutes } from "./utils/datetimeUtils";
import { useTranslation } from "react-i18next";
import { bookAppointment } from "./appointmentsApiCalls";

function BookAppointment({ slot, session, setAppointment, setSlotStatus }) {
  const patient_id = localStorage.getItem("patient_id");
  const patient_name = localStorage.getItem("patient_name");
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const presentationRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "white",
    borderRadius: "4++++px",
    boxShadow: 10,
    p: 3,
  };

  const handleSubmit = () => {
    let presentation = presentationRef.current.value;
    bookAppointment(slot.id, patient_id, presentation);
    setSlotStatus((status) => ({ ...status, booked: true, empty: false }));
    setAppointment((prev) => ({
      ...prev,
      presentation: presentation,
      patient_name: patient_name,
    }));

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="book_appointment_box">
          <h2>{t("book appointment")}</h2>
          <div>
            <label className="book_appt_label">
              Patient:
              <span className="form-fields">
                {" "}
                {patient_id && patient_name}{" "}
              </span>
            </label>
          </div>

          <div className="book_appointment_box__element">
            <label className="book_appt_label">
              Start:
              <span className="form-fields">{slot?.planned_start} </span>
            </label>
            <label className="book_appt_label">
              Duration:
              <span className="form-fields">
                {formatMinutes(slot?.slot_duration)}{" "}
              </span>
            </label>

            <label className="book_appt_label">
              Date:
              <span className="form-fields">
                {formatDate(session.start).dateStr}
              </span>
            </label>
          </div>

          <div>
            <label className="book_appt_label">
              Clinic:
              <span>{session?.clinician}</span>
            </label>
          </div>
          <div>
            <label className="book_appt_label">
              Presentation:
              <input
                type="text"
                className="form-fields"
                ref={presentationRef}
              />
            </label>
          </div>

          <input
            className="page_button page_button-width-medium page_button-width-medium-fixed"
            type="button"
            value={"Book"}
            onClick={() => handleSubmit()}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default BookAppointment;
