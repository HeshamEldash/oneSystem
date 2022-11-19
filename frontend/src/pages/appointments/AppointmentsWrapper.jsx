import React from "react";
import AppointmentPanel from "./AppointmentPanel";
import {
  AppointmentContext,
  AppointmentsContextProvider,
} from "./AppointmentsContext";
import AppointmentsScheduler from "./appointmentsCreate/AppointmentsScheduler";
import ClinicCreate from "./appointmentsCreate/ClinicCreate";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function AppointmentsWrapper() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppointmentsContextProvider>
        {/* <AppointmentPanel/> */}
        <div className="main_page_under_nav">
          {/* <ClinicCreate/> */}

          <AppointmentsScheduler />
        </div>
      </AppointmentsContextProvider>
    </LocalizationProvider>
  );
}

export default AppointmentsWrapper;
