import React, { useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { AppointmentContext } from "../AppointmentsContext";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CalenderComponent from "../CalenderComponent";
import CalenderWrapper from "../hooks/CalenderWrapper";

function AppointmentsScheduler() {
  const { t } = useTranslation();

  const { clinics } = useContext(AppointmentContext);

  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedStartHour, setSelectedStartHour] = useState("");
  const [selectedStartMinute, setSelectedStartMinute] = useState("");

  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [selectedEndMinute, setSelectedEndMinute] = useState("");
  const [selectedSlotDuration, setSelectedSlotDuration] = useState("");

  const listOfHours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13", "14","15", "16", "18", "17","19","20","21", "22",  "23","24",];
  const listOfMinutes =["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
  const listOfDurations =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59, 60]


  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 150,
      },
    },
  };
  const timePickerSelectStyle = { width: "5rem" };



  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: loginSchema,
    // onSubmit,
  });

  return (


    
    <div className=" primary--page-box ">
      selected date  
      start hour {selectedStartHour}
      {"       "}
      start minute {selectedStartMinute}
      {"     "}
      end hour  {selectedEndHour}
      {"    "}
      end minute {selectedEndMinute}
      slot duration {selectedSlotDuration}

      <FormControl fullWidth>
        <InputLabel id="selected-clinic-label">{t("Clinic")}</InputLabel>

        <Select
          labelId="selected-clinic-label"
          id="selected-clinic"
          value={selectedClinic}
          label={t("clinic")}
          onChange={(e) => setSelectedClinic(e.target.value)}
        >
          {clinics?.map((clinic) => {
            return (
              <MenuItem value={clinic.id} key={clinic.id}>
                {"Dr "}
                {clinic?.clinican_details?.first_name}
                {clinic?.clinican_details?.last_name}
                {" - "}
                {clinic?.speciality}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className="scheduler_box">
        <CalenderWrapper
        
         />

        <div>
        
          {/* //////////////////////////////////////////////// START\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

          <InputLabel id="selectedStartHour-label">{t("Start")}</InputLabel>

          <Select
            labelId="selectedStartHour-label"
            id="selectedHour"
            value={selectedStartHour}
            label={t("hour")}
            onChange={(e) => setSelectedStartHour(e.target.value)}
            MenuProps={MenuProps}
            sx={timePickerSelectStyle}
          >
            {listOfHours?.map((hour) => {
              return (
                <MenuItem value={hour} key={hour}>
                  {hour}
                </MenuItem>
              );
            })}
          </Select>

          {" : "}

          <Select
            // labelId="selectedStartHour-label"
            id="selectedStartMinute"
            value={selectedStartMinute}
            label={t("minute")}
            onChange={(e) => setSelectedStartMinute(e.target.value)}
            MenuProps={MenuProps}
            sx={timePickerSelectStyle}
          >
            {listOfMinutes?.map((minute) => {
              return (
                <MenuItem value={minute} key={minute}>
                  {minute}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {/* //////////////////////////////////////////////// START\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

        <div>
          <InputLabel id="selectedEndHour-label">{t("End")}</InputLabel>
          {/* //////////////////////////////////////////////// END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

          <Select
            labelId="selectedEndHour-label"
            id="selectedEndHour"
            value={selectedEndHour}
            label={t("hour")}
            onChange={(e) => setSelectedEndHour(e.target.value)}
            MenuProps={MenuProps}
            sx={timePickerSelectStyle}
          >
            {listOfHours?.map((hour, index) => {
              const starHourIndex = listOfHours.indexOf(selectedStartHour);
              if (index >= starHourIndex) {
                return (
                  <MenuItem value={hour} key={hour}>
                    {hour}
                  </MenuItem>
                );
              }
            })}
          </Select>

          {" : "}

          <Select
            id="selectedEndMinute"
            value={selectedEndMinute}
            label={t("minute")}
            onChange={(e) => setSelectedEndMinute(e.target.value)}
            MenuProps={MenuProps}
            sx={timePickerSelectStyle}
          >
            {listOfMinutes?.map((minute) => {
              return (
                <MenuItem value={minute} key={minute}>
                  {minute}
                </MenuItem>
              );
            })}
          </Select>

          {/* //////////////////////////////////////////////// END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
        </div>

            <div>
        <InputLabel id="SlotDuration-label" sx={{display:"block"}}>
        {t("Slot Duration")} 
        </InputLabel>



        <Select
            labelId="SlotDuration-label"
            id="SlotDuration"
            value={selectedSlotDuration}
            label={t("slot Duration")}
            onChange={(e) => setSelectedSlotDuration(e.target.value)}
            MenuProps={MenuProps}
            sx={timePickerSelectStyle}
          >
            {listOfDurations?.map((slot) => {
              return (
                <MenuItem value={slot} key={slot}>
                  {slot}
                </MenuItem>
              );
            })}
          </Select>
          </div>
      </div>
    </div>
  );
}

        {/* <input type="text" className="form-fields" ref={slotDurationRef} /> */}

export default AppointmentsScheduler;

// function AppointmentsScheduler() {
//   const { t } = useTranslation();
//   const [value, setValue] = useState(null);
//   const [selectedDays, setSelectedDays] = useState([]);
//   const inputRef = useRef();
//   const handleChange = (e) => {
//     // const {day, month, year} = e[e.length - 1]
//     console.log(e);

//     setSelectedDays(() => [...e]);
//   };

//   const repeatWeakly = (date, numberOfRepeats) => {
//     // add the number of weeks functionality

//     const { day, month, year } = date;
//     const listOfDays = [];
//     const nday = addWeeks(new Date(year, month - 1, day), 1);

//     const ndayformated = {
//       day: nday.getDate(),
//       month: nday.getMonth() + 1,
//       year: nday.getFullYear(),
//     };

//     let startingDate = new Date(year, month - 1, day);
//     for (let i = 0; i < numberOfRepeats; i++) {
//       const nday = addWeeks(startingDate, 1);
//       const ndayformated = {
//         day: nday.getDate(),
//         month: nday.getMonth() + 1,
//         year: nday.getFullYear(),
//       };
//       startingDate = nday;
//       listOfDays.push(ndayformated);
//     }

//     setSelectedDays((prev) => [...prev, ...listOfDays]);

//   };

//   const excuteRepeat = () => {

//     selectedDays.map((day) => {
//       repeatWeakly(day, 2);
//     });

//     setSelectedDays((prev) => {
//       return prev.filter(
//         (value, index, self) =>
//           index ===
//           self.findIndex(
//             (t) => t.day === value.day && t.month === value.month && t.year === value.year
//           )
//       );
//     });
//   };

//   return (
//     <div>
//       <DatePicker />

//       <Calendar value={selectedDays} onChange={handleChange} />

//       <input type="button" value={"click"} onClick={excuteRepeat} />

//       <input type="text" ref={inputRef} />

//       {/* <PickersDay
//       day={new Date()}
//       outsideCurrentMonth={false}
//     />

// <CalendarPicker/> */}

//       {/* <label> {t("staff")}</label>
//       <input />
//       <br />
//       <label> {t("Session")}</label>
//       <label> {t("start time")}</label>
//       <input />
//       <label> {t("end time")}</label>
//       <input /> */}
//       {/* <label> {t("slot duration")}</label>
//         <DatePicker
//           label="Start date"
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       <input />

//       <label> {t("dates to be created on")}</label>
//       <input />
//  */}
//     </div>
//   );
// }

// export default AppointmentsScheduler;
