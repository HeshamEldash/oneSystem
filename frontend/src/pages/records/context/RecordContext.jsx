import Context from "@mui/base/TabsUnstyled/TabsContext";
import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { providerProfileSchema } from "../../provider/providerProfileSchema";
import { getPatientProfile } from "../apiCalls/recordsApiCalls";

const RecordContext = createContext();



function RecordContextProvider(props) {
  const [patientProfile, setPatientProfile] = useState({});

  const { patient_id } = useParams("patient_id");

  const getProfileData = async ()=>{
      const profileData = await getPatientProfile(patient_id)
      setPatientProfile(profileData)
  }


  useEffect(()=>{
    getProfileData()
  },[])


  const contextData = {

    patient:patientProfile
    // patient: {
    //   id: "7",
    //   first_name: "هشام",
    //   middle_names: "مدحت",
    //   last_name: "سعيد",
    //   date_of_birth: "1992-10-10",
    //   account_email: "h@ehep.comew",
    //   telephone_numbers: [
    //     {
    //       id: 164,
    //       telephone_number: "01112345698",
    //     },
    //   ],
    //   address: {
    //     id: 47,
    //     unit_number: "1",
    //     first_line: "شارع النزهة",
    //     second_line: "تارا كومباوند",
    //     city: "الشيح زايد",
    //     governorate: "جيزة",
    //     patient: 7,
    //     owner: 7,
    //   },
    // },
  };




  return (
    <RecordContext.Provider value={{ contextData }}>
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordContext, RecordContextProvider };
