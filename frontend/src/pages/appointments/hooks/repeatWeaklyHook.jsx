import react, { createContext, useState, useEffect, useContext } from "react";
import { format, Interval, addWeeks, addDays, isValid } from "date-fns";

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

//   setSelectedDays((prev) => [...prev, ...listOfDays]);

  return listOfDays

};

const excuteRepeat = () => {
//   selectedDays.map((day) => {
//     repeatWeakly(day, 2);
//   });

//   setSelectedDays((prev) => {
//     return prev.filter(
//       (value, index, self) =>
//         index ===
//         self.findIndex(
//           (t) =>
//             t.day === value.day &&
//             t.month === value.month &&
//             t.year === value.year
//         )
//     );
//   });
};

export {repeatWeakly, excuteRepeat}