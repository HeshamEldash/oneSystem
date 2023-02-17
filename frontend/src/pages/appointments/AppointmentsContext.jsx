import { isToday } from "date-fns";
import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getClinicData, getSessionData } from "./appointmentsApiCalls";
import { builtInIsToday } from "./utils/datetimeUtils";

const AppointmentContext = createContext();
function AppointmentsContextProvider(props) {
  const [clinics, setClinics] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [displayDate, setDisplayDate] = useState();

  const { id } = useParams();

  const todaySessions = sessions?.filter((session) => {
    if (builtInIsToday(session?.start)) return session;
  });


  const appts = todaySessions
    .map(tSession => tSession.slot_set)
    .flat()
    .filter(slot => slot.appointment != null)


  const getClinicDataCall = async () => {
    const clinicData = await getClinicData(id);
    setClinics(clinicData);
  };

  const getSessions = async () => {
    const sessionsData = await getSessionData(id);
    setSessions(sessionsData);
  };

  useEffect(() => {
    getClinicDataCall();
    getSessions();
  }, []);

  const contextData = {
    provider_id: id,
    clinics: clinics,
    setClinics: setClinics,
    sessions: sessions,
    setSessions: setSessions,
    dateToShow: "10-10-120",
    setDisplayDate: (d) => setDisplayDate(d),
    displayDate: displayDate,
    todayAppts: appts,
  };

  return (
    <AppointmentContext.Provider value={contextData}>
      {props.children}
    </AppointmentContext.Provider>
  );
}

export { AppointmentsContextProvider, AppointmentContext };
