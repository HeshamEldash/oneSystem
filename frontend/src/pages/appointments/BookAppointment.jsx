import React, { useContext, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { formatDate, formatMinutes } from "./utils/datetimeUtils";
import { useTranslation } from "react-i18next";
import { bookAppointment } from "./appointmentsApiCalls";
import { AppointmentContext } from "./AppointmentsContext";
import { ProviderPatientSearch } from "../provider/ProviderPatientSearch";
function BookAppointment({ slot, session, setAppointment, setSlotStatus , closeSlot}) {
  const patient_id = localStorage.getItem("patient_id");
  const patient_name = localStorage.getItem("patient_name");

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [openSearch, setOpenSearch] = React.useState(false);
  const presentationRef = useRef();
  const handleClose = () => setOpen(false);
  const handleCloseSearch = () => setOpenSearch(false);
  const { setSessions } = useContext(AppointmentContext);
  const [searchedPt, setSearchedPt] = useState(null);

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

  const handleSubmit = () => {
    let book_pt_id = searchedPt ? searchedPt.id : patient_id;
    let book_pt_name = searchedPt
      ? searchedPt.first_name + searchedPt.middle_names + searchedPt.last_name
      : patient_name;
    let presentation = presentationRef.current.value;

    setSlotStatus((status) => {
      if (status.blocked) return status;

      bookAppointment(slot.id, book_pt_id, presentation);

      setAppointment((prev) => ({
        ...prev,
        presentation: presentation,
        patient_name: book_pt_name,
      }));

      return { ...status, booked: true, empty: false };
    });

    setSessions((prev) => {
      const a = prev.map((session) => {
        if (session.id === slot.session) {
          session.slot_set.map((originalSLot) => {
            if (originalSLot.id === slot.id) {
              originalSLot.appointment = {};
            }
            return originalSLot;
          });
        }

        return session;
      });
      return a;
    });



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
                {patient_id && patient_name}
                {searchedPt &&
                  searchedPt.first_name +
                    searchedPt.middle_names +
                    searchedPt.last_name}
              </span>
              <div onClick={() => setOpenSearch(true)}>search</div>
              <Modal open={openSearch} onClose={handleCloseSearch}>
                <Box sx={style}>
                  <ProviderPatientSearch
                    exportPt={(searched_pt) => {
                      setSearchedPt(searched_pt);
                      handleCloseSearch();
                    }}
                  />
                </Box>
              </Modal>
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
