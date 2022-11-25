import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AppointmentsContextProvider } from "./AppointmentsContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


function AppointmentsWrapper() {
  let location = useLocation();
  const getPath = () => {
    const locationArray = location.pathname.split("/");

    if (locationArray[locationArray.length - 1] === "appointments") {
      return "panel";
    } else if (locationArray.length === 3) {
      return "home";
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppointmentsContextProvider>
        <div className={getPath() === "panel" ? null : "main_page_under_nav"}>
          <Outlet />
        </div>
      </AppointmentsContextProvider>
    </LocalizationProvider>
  );
}

export default AppointmentsWrapper;
