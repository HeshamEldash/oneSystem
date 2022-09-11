import Context from "@mui/base/TabsUnstyled/TabsContext";
import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { providerProfileSchema } from "../../provider/providerProfileSchema";
import { getPatientProfile, getPatientRecords } from "../apiCalls/recordsApiCalls";

const RecordContext = createContext();



function RecordContextProvider(props) {
  const [patientProfile, setPatientProfile] = useState({});
    const [patientRecords, setPatientRecords] = useState([])
  const { patient_id } = useParams("patient_id");

  const getProfileData = async ()=>{
      const profileData = await getPatientProfile(patient_id)
      setPatientProfile(profileData)
  }
  const getRecordsData = async ()=>{
    const recordsData = await getPatientRecords(patient_id)
    setPatientRecords(recordsData)
  }

  useEffect(()=>{
    getProfileData()
    getRecordsData()
  },[])


  const contextData = {

    patient:patientProfile,
    records:patientRecords
  };




  return (
    <RecordContext.Provider value={{ contextData }}>
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordContext, RecordContextProvider };
