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


const deleteClinic = async( clinic_id)=>{
  let response = await fetch(
    `${APIENDPOINT}/appointments/clinic/?` + new URLSearchParams({ clinic_id:clinic_id}),
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      }
    }
  )
}

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

  const bookAppointment = async (slot_id,patient_id, presentation) => {
    let response = await fetch(
      `${APIENDPOINT}/appointments/appointment/?` + new URLSearchParams({slot_id:slot_id}),
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
        body:JSON.stringify({
          patient: patient_id,
          presentation: presentation,
        })
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  
    return response;
  };


  const updateAppointmentStatus = async (slot_id,status) => {
    let response = await fetch(
      `${APIENDPOINT}/appointments/slot/?` + new URLSearchParams({slot_id:slot_id}),
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
        body:JSON.stringify({
            status:status
        })
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  
    return response;
  };



  export { bookAppointment, updateAppointmentStatus, deleteClinic, getClinicData,getSessionData,postClinicData,postSessionData,  }