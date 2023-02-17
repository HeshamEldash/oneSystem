import axios from "axios";
import APIENDPOINT from "../../../api/apiEndpoint.jsx";



const searchPatients = async (values, provider_id) => {
  try {
    const params = new URLSearchParams(values);
    provider_id && params.append("provider", provider_id);

    const response = await axios.get(
      `${APIENDPOINT}/users/search-patients/`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// const searchPatients = async (values, provider_id) => {
//   const params = new URLSearchParams(values);
//   provider_id && params.append("provider", provider_id);

//   const response = await fetch(
//     `${APIENDPOINT}/users/search-patients/?` + new URLSearchParams(params),
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization:
//           "Bearer " +
//           String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//     }
//   );

//   if (response.ok) {
//     return response.json();
//   }
// };





const getAllPatients = async (provider_id, params) => {
  try {
    const response = await axios.get(
      `${APIENDPOINT}/users/registration-list/${provider_id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        params: params,
      }
    );
    return response.data;

  } catch (error) {
    throw error;
  }
};


// const getAllPatients = async (provider_id) => {
//   const response = await fetch(
//     `${APIENDPOINT}/users/registration-list/${provider_id}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization:
//           "Bearer " +
//           String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//     }
//   );

//   if (response.ok) {
//     return response.json();
//   }
// };

const deleteBranch = async ({ provider_id, branch_id }) => {
  try{
    const { data } = await axios.delete(`${APIENDPOINT}/users/branch-delete-api/?`,{
      params:{ branch_id: branch_id, provider_id: provider_id },
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    }
    )
    return data;
  }
  catch  (err) {
    throw err
  }
};






const getBranches = async ({provider_id}) => {
  try {
    const { data } = await axios.get(`${APIENDPOINT}/users/branch-list-api/?`, {
      params: { provider_id: provider_id },
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    });
    return data;
  } catch (err) {
      throw err
  }
};




const createBranch = async (data) => {
  try {
    const response = await axios.post(`${APIENDPOINT}/users/branch-create-api/`, {
      provider: data.provider,
      branch_name: data.branch_name,
      unit_number: data.unit_number,
      first_line: data.first_line,
      second_line: data.second_line,
      city: data.city,
      governorate: data.governorate,
      telephone_number: data.telephone_number,
    }, {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// const createBranch = async (data) => {
//   const response = await fetch(`${APIENDPOINT}/users/branch-create-api/`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       Authorization:
//         "Bearer " +
//         String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//     },
//     body: JSON.stringify({
//       provider: data.provider,
//       branch_name: data.branch_name,
//       unit_number: data.unit_number,
//       first_line: data.first_line,
//       second_line: data.second_line,
//       city: data.city,
//       governorate: data.governorate,
//       telephone_number: data.telephone_number,
//     }),
//   });
//   if (response.ok) {
//     return response.json();
//   }
// };


const updateBranchTelephoneList = async ({ branch_id, provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-telephone-update-api/?` +
      new URLSearchParams({ branch_id: branch_id, provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokdens"))?.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
      throw error
    });
};

const updateBranchAddress = async ({ branch_id, provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-update-api/?` +
      new URLSearchParams({ branch_id: branch_id, provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        branchaddress: data,
      }),
    }
  )

    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const updateProviderProfile = async ({ provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/provider-update-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        name: data,
      }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// let getProfile = async ({ provider_id: provider_id }  ) => {
//   let response = await fetch(
//     `${APIENDPOINT}/users/provider-detail-api/?` +
//       new URLSearchParams({ provider_id: provider_id }),
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization:
//           "Bearer " +
//           String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//     }
//   );

//   if (response.ok) {
//     const data = response.json();
//     return data;
//   } else {
//     throw "An error has happened";
//   }
// };

const getProfile = async ({provider_id: provider_id})=>{
  try{
    const response = await axios.get(`${APIENDPOINT}/users/provider-detail-api/`, {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },

      params:{ provider_id: provider_id }
    })
    return response.data

  }catch (error){
         console.log(error)
  }
}

const updateProviderTelephoneList = async ({ provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-telephone-update-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const createProvider = async (data, user_id) => {
  const response = await fetch(`${APIENDPOINT}/users/provider-create-api/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),

    },
      body: JSON.stringify({
        name: data.name,
        owner: user_id,
        branch_name:data.name,
        unit_number: data.unit_number,
        first_line: data.first_line,
        second_line: data.second_line,
        city: data.city,
        governorate: data.governorate,
        telephone_number: data.telephone_number
      }),
  });

  if (response.ok) {
    const data =  response.json();

    return data;
  }
};

const endEmployment = async (employmentId) => {
  const response = await fetch(
    `${APIENDPOINT}/users/employment-detail/${employmentId}/`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        is_active: false,
      }),
    }
  );
};


// const getAllEmployments = async (provider_id) => {
//   const response = await fetch(
//     `${APIENDPOINT}/users/employment-provider-list-api/?` +
//       new URLSearchParams({ provider_id: provider_id }),
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization:
//           "Bearer " +
//           String(JSON.parse(localStorage.getItem("authTokens"))?.access),
//       },
//     }
//   );

//   if (response.ok) {
//     const data = response.json();
//     return data;
//   } else {
//     throw "An error has happened";
//   }


// };


const getAllEmployments = async ({provider_id:provider_id}) => {
  const response = await axios.get(
    `${APIENDPOINT}/users/employment-provider-list-api/`,
  
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      params:{ provider_id: provider_id }
    }
  );
  return response.data

};


const createEmployment = async (staff_email, provider_id) => {
  const response = await fetch(`${APIENDPOINT}/users/employment-create/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
    body: JSON.stringify({
      staff: staff_email,
      provider: provider_id,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return {
          msg: "successful_staff_has_been_registered",
          status: response.status,
        };
      }
      if (response.status === 500) {
        // need to add already registered message

        throw Error("This_staff_doesn't_exists,_plese_register_first");
      } else if (!response.ok) {
        throw Error("An_error_has_occured");
      }
    })
    .catch((err) => {
      return { msg: err.message };
    });

  return response;
};

const createRegistration = async (provider_id, patient) => {
  const response = await fetch(
    `${APIENDPOINT}/users/registration-list/${provider_id}/`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        // staff: staff_email,
        provider: provider_id,
      }),
    }
  );
};



const getNumberOfPatients = async ({provider_id : provider_id}) => {
  console.log(provider_id)
  const response = await axios.get(
    `${APIENDPOINT}/users/patient-provider-count-api/`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        params: {provider_id: provider_id }
    }
  );
  return response.data

};





export {
  searchPatients,
  getProfile,
  createEmployment,
  createProvider,
  getAllEmployments,
  endEmployment,
  getAllPatients,
  getBranches,
  updateBranchAddress,
  updateBranchTelephoneList,
  deleteBranch,
  updateProviderProfile,
  createBranch,
  getNumberOfPatients,

};
