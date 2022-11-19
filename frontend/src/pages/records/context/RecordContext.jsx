import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  getPrescriptionList,
  getRegularMedications,
} from "../../medications/medicationsApiCalls";
import {
  getPatientProfile,
  getPatientRecords,
} from "../apiCalls/recordsApiCalls";

const RecordContext = createContext();

function RecordContextProvider(props) {
  const [patientProfile, setPatientProfile] = useState({});
  const [patientRecords, setPatientRecords] = useState([]);
  const [allPresciptions, setAllPrescriptions] = useState([]);
  const [regularMedications, setRegularMedications] = useState([]);

  const { patient_id } = useParams("patient_id");
  const [contextPrescribedList, setContextPrescribedList] = useState([]);

  const getProfileData = async () => {
    const profileData = await getPatientProfile(patient_id);
    setPatientProfile(profileData);
  };
  const getRecordsData = async () => {
    const recordsData = await getPatientRecords(patient_id);
    setPatientRecords(recordsData);
  };

  const getAllPrescriptions = async () => {
    const prescriptionData = await getPrescriptionList(patient_id);
    setAllPrescriptions(prescriptionData);
  };

  const getRegularMedicationsData = async () => {
    const regularMedicationsData = await getRegularMedications(patient_id);
    setRegularMedications(regularMedicationsData);
  };

  useEffect(() => {
    getProfileData();
    getRecordsData();
    getAllPrescriptions();
    getRegularMedicationsData();
    localStorage.setItem("patient_id", patient_id);
  }, []);

  // useEffect(()=>{
  //   return () => {
  //     alert('The component is going to be unmounted');
  // }
  // }, [])
  const contextData = {
    patientId: patientProfile.id,
    patient: patientProfile,
    records: patientRecords,
    contextPrescribedList: contextPrescribedList,
    setContextPrescribedList: setContextPrescribedList,
    allPrescriptions: allPresciptions,
    regularMedications: regularMedications,
  };

  // componentWillUnmount() {
  //     alert('The component is going to be unmounted');
  //   }

  return (
    <RecordContext.Provider value={{ contextData }}>
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordContext, RecordContextProvider };
