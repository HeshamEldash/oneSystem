import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));



const getSessionData = async (provider_id) => {
  let response = await fetch(
    `${APIENDPOINT}/appointments/sessions/?` + new URLSearchParams({
      provider_id:provider_id
    }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  return response;
};


const postSessionData = async (provider_id, listOfData) => {
  /**
    [{
      "start": "2022-11-20T15:12:30Z",
      "end": "2022-11-20T18:00:00Z",
      "clinic_id": 1,
      "slot_duration": 5
          },
      {
      "start": "2022-11-20T15:12:30Z",
      "end": "2022-11-20T18:00:00Z",
      "clinic_id": 1,
      "slot_duration": 5
      }
      ]  
       */
  let response = await fetch(
    `${APIENDPOINT}/appointments/sessions/?` + new URLSearchParams({ provider_id:provider_id}),
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body:JSON.stringify(listOfData)
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  return response;
};


const getClinicData = async (provider_id) => {
    let response = await fetch(
      `${APIENDPOINT}/appointments/clinics/?` + new URLSearchParams({provider_id: provider_id}),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  
    return response;
  };

  const postClinicData = async (provider_id, selectedStaff, speciality) => {
    let response = await fetch(
      `${APIENDPOINT}/appointments/clinics/?` + new URLSearchParams({ provider_id:provider_id}),
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
        body:JSON.stringify({
          speciality: speciality,
          provider: provider_id,
          clinican: selectedStaff,
        })
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  
    return response;
  };


  
  const getSlots = async () => {
    let response = await fetch(
      `${APIENDPOINT}/some api endpoint/` + new URLSearchParams({}),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  
    return response;
  };

  export { getClinicData,getSessionData,postClinicData,postSessionData,  }