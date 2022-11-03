import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));



const getPrescriptionList = async (patient_id)=>{
    let response = await fetch(
        `${APIENDPOINT}/medicines/prescription-list/?` +
          new URLSearchParams({ patient_id: patient_id }),
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(token.access),
          },
        }
      );
}


const createPrescription = async (patient_id,providerId, prescriptionData)=>{
  console.log(prescriptionData)
    let response = await fetch(
        `${APIENDPOINT}/medicines/prescription-list/?` +
          new URLSearchParams({ patient_id: patient_id }),
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(token.access),
          },
          body:JSON.stringify({
            medications:prescriptionData,
            provider: providerId,
            patient:patient_id
          })
        }
      );
}


export { createPrescription, getPrescriptionList}