import axios from "axios";
import APIENDPOINT from "../../api/apiEndpoint.jsx";

const getSessionData = async (provider_id) => {
  let response = await fetch(
    `${APIENDPOINT}/appointments/sessions/?` + new URLSearchParams({
      provider_id:provider_id
    }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  return response;
};


// const getClinicData = async (provider_id) => {
//   let response = await fetch(
//     `${APIENDPOINT}/appointments/clinics/?` + new URLSearchParams({provider_id: provider_id}),
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => data);

//   return response;
// };



// const getSessionData = async ({provider_id:provider_id}) => {
//   let response = await axios.get(
//     `${APIENDPOINT}/appointments/sessions/`,
//     {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//       params:{provider_id:provider_id}
//     }
//   )
//   console.log(response)

//   return response.data;
// };


const getClinicData = async ({provider_id:provider_id}) => {
  let response = await axios.get(
    `${APIENDPOINT}/appointments/clinics/` ,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      params:{provider_id:provider_id},
    }
  )
  // console.log(response.data)
  return response.data;
};



const postSessionData = async (provider_id, listOfData) => {
  let response = await fetch(
    `${APIENDPOINT}/appointments/sessions/?` + new URLSearchParams({ provider_id:provider_id}),
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body:JSON.stringify(listOfData)
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  return response;
};


const deleteClinic = async( clinic_id)=>{

   await axios.delete(
    `${APIENDPOINT}/appointments/clinic/` ,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      params:{ clinic_id:clinic_id}
    }
  )
  .then(response => {
     return response.data
  })
  

}



  const postClinicData = async ({providerId,selectedBranch, selectedStaff, speciality}) => {
    let response = await axios.post(
      `${APIENDPOINT}/appointments/clinic-create/` ,
      {
        speciality: speciality,
        provider: providerId,
        branch:selectedBranch,
        clinican: selectedStaff,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        params:{ provider_id:providerId},
      }
    )
    return response.data 
  };


  // const postClinicData = async ({providerId,selectedBranch, selectedStaff, speciality}) => {
  //   let response = await fetch(
  //     `${APIENDPOINT}/appointments/clinic-create/?` + new URLSearchParams({ provider_id:providerId}),
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  //       },
  //       body:JSON.stringify({
  //         speciality: speciality,
  //         provider: providerId,
  //         branch:selectedBranch,
  //         clinican: selectedStaff,
  //       })
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data);
  
  //   return response;
  // };


  
  const getSlots = async () => {
    let response = await fetch(
      `${APIENDPOINT}/some api endpoint/` + new URLSearchParams({}),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
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
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
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
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
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



  export { bookAppointment, updateAppointmentStatus, deleteClinic, getClinicData,getSessionData,postClinicData,postSessionData}