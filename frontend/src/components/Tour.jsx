import React, { useEffect, useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: ".first-owned-clinic",
    content: "This is the clinic you own",
  },
  {
    target: ".second-employments",
    content: "If you have any roles in other clinics it will appear here",
  },
  {
    target: ".third-provider-button",
    content: "Now let's view your clinic, click Go To Your Profile",
  },
  {
    target: ".fourth-appointments",
    content:
      "Here you can view the number of appointments and go to the appointment panel",
  },
  {
    target: ".fifth-branches",
    content:
      "Each clinic can have multiple branches.The branches will appear here & you can manage it in the settings",
  },
  {
    target: ".sixth-settings",
    content: "You can also manage staff from the settings",
  },
  {
    target: ".seventh-appointments",
    content:
      "Each branch can have multiple sub-clinics with different specialties and clincians. Each clinic has sessions and slots, you can view all this in the appointments section",
  },
  {
    target: ".eighth-patients",
    content:
      "Now let;s view a patient record, click here and select search patients",
  },
  {
    target: ".nighth-first-name-search",
    content:
      "Search for a patient with the first name 'test', and click search",
  },
  {
    target: ".tenth-search-results",
    content:
      "Here you will finds all the patients that mach this search. now double click on the patient details to open the record",
  },
  {
    target: ".eleventh-consultation",
    content:
      "Here you can record the details of the encounter with the patient and either save it locally so it's only visible to you or save it so any one can see what you have documented",
  },
  {
    target: ".twelevth-medications",
    content:
      "Here you can view the patient regular medications and previous prescriptions",
  },
  {
    target: ".thighrteenth-medication-prescribe",
    content: "Now click here to start prescribing a medication",
  },
  {
    target: ".fourteenth-mediaction-panel",
    content:
      "You can either prescibe one of the medications in the database or free text the prescription",
  },
  {
    target: ".fifteenth-medication-database-try",
    content:
      "Start searching for the medication. Then select the desired preperation. The dose box will show afterwards, enter the required dose and click prescribe",
  },
  {
    target: ".sixteenth-medication-prescribe",
    content: "Now click here to prescribe the medication",
  },
  {
    target: ".eighteenth-past-history",
    content:
      "here you can find the pas medical history for the patient. You can also code conditions",
  },
  {
    target: ".nighnteenth-documents",
    content: "Here you can view the patient documents and upload new ones",
  },
];

const APPOINTMENT_STEPS = [
  {
    target: ".fourth-appointments",
    content:
      "Here you can view the number of appointments and go to the appointment panel",
  },
  {
    target: ".fifth-branches",
    content:
      "Each clinic can have multiple branches.The branches will appear here & you can manage it in the settings",
  },
  {
    target: ".sixth-settings",
    content: "You can also manage staff from the settings",
  },
];

const INITIAL_STATE = {
  run: true,
  continuous: true,
  loading: false,
  stepIndex: 0, // Make the component controlled
  steps: TOUR_STEPS,
  debug: true,
  key: new Date(), // This field makes the tour to re-render when the tour is restarted
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // start the tour
    case "START":
      return { ...state, run: true };
    // Reset to 0th step
    case "RESET":
      return { ...state, stepIndex: 0 };
    // Stop the tour
    case "STOP":
      return { ...state, run: false };
    // Update the steps for next / back button click
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    // Restart the tour - reset go to 1st step, restart create new tour
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

const Tour = ({ pathname }) => {
  const callback = (data) => {
    const { action, index, type, status } = data;

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      console.log(action, index, type, status);
      
    }


  };

  return (
    <>
      <JoyRide
        callback={callback}
        debug={true}
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        key={new Date()}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },

          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
        }}
      />
    </>
  );
};

export const AppointmentTour = () => {
  return <JoyRide steps={APPOINTMENT_STEPS} />;
};

export default Tour;
