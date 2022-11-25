import React, { useContext, useEffect, useState } from "react";
import DatePicker, { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { AppointmentContext } from "./AppointmentsContext";

function CalenderComponent({ setParent, updatedDays, range }) {
  const {setDisplayDate} = useContext(AppointmentContext)

  const today = new Date();
  const dayFormatted = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  // const [range, setRange] = useState(false);

  const [selectedDays, setSelectedDays] = useState(
    range
      ? {
          from: dayFormatted,
          to: null,
        }
      : dayFormatted
  );

  
//   const [selectedDays, setSelectedDays] = useState(
// null
//   );
  const outPutDate = new Date(selectedDays.year + "-" + selectedDays.month + "-" + selectedDays.day )




  useEffect(() => {
    setParent && setParent(selectedDays);
    setDisplayDate(outPutDate)

  }, [selectedDays]);

  return (
    <div>
      <Calendar
      calendarClassName ="calender"
        value={updatedDays ? updatedDays : selectedDays}
        onChange={setSelectedDays}
      />
    </div>
  );
}

export default CalenderComponent;
