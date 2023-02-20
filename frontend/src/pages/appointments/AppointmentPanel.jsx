import React, { useContext } from "react";
import "./appointments.css";
import AppointmentSideBar from "./AppointmentSideBar";
import Clinic from "./Clinic";
import CalenderComponent from "./CalenderComponent";
import { AppointmentContext } from "./AppointmentsContext";
import Session from "./Session";
import { formatDate } from "./utils/datetimeUtils";
function AppointmentPanel() {
  const { sessions, clinics } = useContext(AppointmentContext);
  const { displayDate } = useContext(AppointmentContext);

  return (
    <div className="main_appointment_panel">
      <AppointmentSideBar>
        <CalenderComponent />

      </AppointmentSideBar>
      <div className="clinics_panel">
        {clinics?.map((clincData) => {
          const sessionData = sessions.filter((session) => {
            return (
              session.clinic_id === clincData.id &&
              formatDate(session.start).dateStr ===
                formatDate(displayDate).dateStr
            );
          });

          return (
            <Clinic
              key={clincData.id}
              clinican={clincData.clinican_details}
              speciality={clincData.speciality}
            >
              {sessionData.map((session) => {
                return <Session key={session.id} sessionDetails={session} />;
              })}
            </Clinic>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentPanel;
