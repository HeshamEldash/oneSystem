import React, { useState, useRef } from "react";
import CalenderComponent from "../CalenderComponent";
import { repeatWeakly } from "./repeatWeaklyHook";
import { format, Interval, addWeeks, addDays, isValid } from "date-fns";

function CalenderWrapper({ children }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [needReset, setNeedReset] = useState(false);
  const inputRef = useRef();

  const repeatWeakly = (date, numberOfRepeats) => {
    // add the number of weeks functionality
    const { day, month, year } = date;
    const listOfDays = [];
    const nday = addWeeks(new Date(year, month - 1, day), 1);

    const ndayformated = {
      day: nday.getDate(),
      month: nday.getMonth() + 1,
      year: nday.getFullYear(),
    };

    let startingDate = new Date(year, month - 1, day);
    for (let i = 0; i < numberOfRepeats; i++) {
      const nday = addWeeks(startingDate, 1);
      const ndayformated = {
        day: nday.getDate(),
        month: nday.getMonth() + 1,
        year: nday.getFullYear(),
      };
      startingDate = nday;
      listOfDays.push(ndayformated);
    }

    setSelectedDays((prev) => [...prev, ...listOfDays]);
  };

  const excuteRepeat = () => {
    selectedDays.map((day) => {
      repeatWeakly(day, inputRef?.current?.value);
    });

    setSelectedDays((prev) => {
      return prev.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.day === value.day &&
              t.month === value.month &&
              t.year === value.year
          )
      );
    });

    setNeedReset(true);
  };
  const reset = () => {
    setSelectedDays([]);
    setNeedReset(false);
  };

  return (
    <div>
      <CalenderComponent
        updatedDays={selectedDays}
        setParent={(data) => setSelectedDays(data)}
        
      />

      <input type="number" ref={inputRef} disabled={needReset ? true : false} />

      <input
        type="button"
        value={needReset ? "reset" : "click"}
        onClick={needReset ? reset : excuteRepeat}
      />
    </div>
  );
}

export default CalenderWrapper;
