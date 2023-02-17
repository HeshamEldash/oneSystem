import  { createContext, useState } from "react";
import { useParams } from "react-router";

import { useGetAllPrescriptions, useGetRegularMedicationsData } from "../../medications/useMedicationDataApi";
import { useGetPatinetProfile, useGetRecordsData } from "../apiCalls/useRecordDataApi";

const RecordContext = createContext();

function RecordContextProvider(props) {
  const { patient_id } = useParams("patient_id");

  const [contextPrescribedList, setContextPrescribedList] = useState([]);

  const {data:patientProfile}= useGetPatinetProfile(patient_id)
  const {data:patientRecords}= useGetRecordsData(patient_id)
  const {data:allPresciptions}= useGetAllPrescriptions(patient_id)
  const {data:regularMedications}= useGetRegularMedicationsData(patient_id)
  
  localStorage.setItem("patient_name", `${patientProfile?.first_name} ${patientProfile?.middle_names} ${patientProfile?.last_name}`);
  localStorage.setItem("patient_id", patient_id);
  
  const contextData = {
    patientId: patientProfile?.id,
    patient: patientProfile,
    records: patientRecords,
    contextPrescribedList: contextPrescribedList,
    setContextPrescribedList: setContextPrescribedList,
    allPrescriptions: allPresciptions,
    regularMedications: regularMedications,
  };

  return (
    <RecordContext.Provider value={{ contextData }}>
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordContext, RecordContextProvider };
