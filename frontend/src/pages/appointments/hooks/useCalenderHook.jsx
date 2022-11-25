import React, {useEffect, useState, useRef} from 'react'
import { format, Interval, addWeeks, addDays, isValid } from "date-fns";

function useCalenderHook() {

  const [selectedDates, setSelectedDates] = useState([]);
  const [needReset, setNeedReset] = useState(false);
  const numberOfWeeksRef = useRef();

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

    setSelectedDates((prev) => [...prev, ...listOfDays]);
  };

  const excuteRepeat = () => {
    selectedDates?.map((day) => {
      repeatWeakly(day, numberOfWeeksRef?.current?.value);
    });

    setSelectedDates((prev) => {
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
    setSelectedDates([]);
    setNeedReset(false);
    numberOfWeeksRef.current.value = 0
  };


  useEffect(()=>{},
  [selectedDates])

  return {
    selectedDates,
    setSelectedDates,
    excuteRepeat,
    repeatWeakly,
    reset,
    needReset,
    numberOfWeeksRef,
  }
}

export default useCalenderHook
