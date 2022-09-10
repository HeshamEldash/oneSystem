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
  

export {getPatientProfile}