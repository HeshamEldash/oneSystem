import APIENDPOINT from "../../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));





const getPatientProfile = async (patient_id) => {
    let response = await fetch(`${APIENDPOINT}/users/patient-profile-detail/${patient_id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    });
  
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw "An error has happened";
    }
  };
  
  const getPatientRecords = async (patient_id) => {
    let response = await fetch(`${APIENDPOINT}/records/patients-records/?`+ new URLSearchParams({patient_id:patient_id}), {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    });
  
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw "An error has happened";
    }
  };  

  const createRecord = async (patient_id, data)=>{
    let response = await fetch(`${APIENDPOINT}/records/patients-records/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
        body: JSON.stringify({
            history:"test",
            examination:"test",
            diagnosis:"test",
            managment_plan:"test",
            is_public:false,
            patient:patient_id,
            // author:""
          })
      });

  }



export {getPatientProfile, getPatientRecords, createRecord}