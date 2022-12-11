import React, {  useContext, useState} from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { AppointmentContext } from "../AppointmentsContext";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { dateStringFromCalenderObj } from "../utils/datetimeUtils";
import { postSessionData } from "../appointmentsApiCalls";
import { ToastContainer, toast } from "react-toastify";
import { schedulerSchema } from "./AppointmentSchedulerSchema";
import useCalenderHook from "../hooks/useCalenderHook";
import { TextField } from '@mui/material';


function AppointmentsSchedulerFormik() {
  const { t } = useTranslation();
  const notify = () =>
    toast(t("sessions created succesfuly"), {
      toastId: "customId",
      className: "black-background",
      bodyClassName: "grow-font-size",
    });

  const { clinics, provider_id, setSessions } = useContext(AppointmentContext);
  const [checkedShowRepeat, setCheckedShowRepeat] = useState(false);

  const {
    selectedDates,
    setSelectedDates,
    numberOfWeeksRef,
    excuteRepeat,
    needReset,
    reset,
  } = useCalenderHook();

  const listOfHours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","18","17","19","20","21","22","23",
  ];
  const listOfMinutes = ["00","05","10","15","20","25","30","35","40","45","50","55",
  ];
  const listOfDurations = [
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60,
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 150,
      },
    },
  };

  const onSubmit = async (values, actions) => {
    let sessionArray = [];
    selectedDates.map((day) => {
      const dateStr = dateStringFromCalenderObj(day);
      const session = {
        start: new Date(
          `${dateStr}T${values.startHour}:${values.selectedStartMinute}`
        ),
        end: new Date(`${dateStr}T${values.endHour}:${values.endMinute}`),
        clinic_id: values.selectedClinic,
        slot_duration: values.slotDuration,
      };
      sessionArray.push(session);
    });

    const newSessions = await postSessionData(provider_id, sessionArray);
    setSessions((prev) => [...prev, ...newSessions]);
    notify();
    actions.resetForm();
  };

  const timePickerSelectStyle = { width: "5rem" };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      startHour: "",
      selectedStartMinute: "",
      endHour: "",
      endMinute: "",
      slotDuration: "",
      selectedClinic: "",
    },
    validationSchema: schedulerSchema,
    onSubmit,
  });



  return (
    <div className=" primary--page-box ">
      <h1>{t("create sessions")}</h1>

      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        style={{ width: "100%" }}
      />

      <form type="submit" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="selected-clinic-label">{t("Clinic")}</InputLabel>

          <Select
            labelId="selected-clinic-label"
            id="selected-clinic"
            value={values.selectedClinic}
            label={t("clinic")}
            name={"selectedClinic"}
            onChange={handleChange}
            error={touched.selectedClinic && Boolean(errors.selectedClinic)}
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
          <div className="scheduler_box__calender">
            <Calendar value={selectedDates} onChange={setSelectedDates} />
          </div>

          <div className="scheduler_box_children">
            <div className="scheduler_box__child">
              <div>
                {/* //////////////////////////////////////////////// START\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

                <InputLabel id="selectedStartHour-label">
                  {t("Start")}
                </InputLabel>

                <Select
                  labelId="selectedStartHour-label"
                  id="selectedHour"
                  value={values.startHour}
                  label={t("hour")}
                  name={"startHour"}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  error={touched.startHour && Boolean(errors.startHour)}
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
                  value={values.selectedStartMinute}
                  label={t("minute")}
                  onChange={handleChange}
                  name={"selectedStartMinute"}
                  MenuProps={MenuProps}
                  sx={timePickerSelectStyle}
                  error={
                    touched.selectedStartMinute &&
                    Boolean(errors.selectedStartMinute)
                  }
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
                  value={values.endHour}
                  label={t("hour")}
                  name={"endHour"}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  sx={timePickerSelectStyle}
                  error={touched.endHour && Boolean(errors.endHour)}
                >
                  {listOfHours?.map((hour, index) => {
                    const starHourIndex = listOfHours.indexOf(values.startHour);
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
                  value={values.endMinute}
                  label={t("minute")}
                  onChange={handleChange}
                  name={"endMinute"}
                  MenuProps={MenuProps}
                  sx={timePickerSelectStyle}
                  error={touched.endMinute && Boolean(errors.endMinute)}
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
                <InputLabel id="SlotDuration-label" sx={{ display: "block" }}>
                  {t("Slot Duration")}
                </InputLabel>

                <Select
                  labelId="SlotDuration-label"
                  id="SlotDuration"
                  value={values.slotDuration}
                  name={"slotDuration"}
                  label={t("slot Duration")}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  sx={timePickerSelectStyle}
                  error={touched.slotDuration && Boolean(errors.slotDuration)}
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

            <div className="scheduler_box__child">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedShowRepeat}
                    onChange={(event) =>
                      setCheckedShowRepeat(event.target.checked)
                    }
                  />
                }
                label="Repeat"
              />

              {checkedShowRepeat && (
                <div className="scheduler_box__child_b">
                  <TextField
                    label={t("number_of_weeks")}
                    inputRef={numberOfWeeksRef}
                    type="number"
                  />

                  <input
                    className="page_button page_button-width-medium page_button-width-small-fixed"
                    onClick={needReset ? reset : excuteRepeat}
                    type="button"
                    value={needReset ? "reset" : "repeat weekly"}
                  />
                </div>
              )}
            </div>

          </div>
            <input
              type="submit"
              className=" scheduler_box__button page_button page_button-width-medium page_button-width-medium-fixed"
              value={t("create_session")}
            />
        </div>
      </form>
    </div>
  );
}

export default AppointmentsSchedulerFormik;
