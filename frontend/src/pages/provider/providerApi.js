import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

let token = JSON.parse(localStorage.getItem("authTokens"));

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const searchPatients = async (values, provider_id) => {
  const params = new URLSearchParams(values);
  provider_id && params.append("provider", provider_id);

  const response = await fetch(
    `${APIENDPOINT}/users/search-patients/?` + new URLSearchParams(params),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
};

const getAllPatients = async (provider_id) => {
  const response = await fetch(
    `${APIENDPOINT}/users/registration-list/${provider_id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
};
const deleteBranch = async ({provider_id, branch_id}) => {
  console.log(branch_id, provider_id)
  return await fetch(
    `${APIENDPOINT}/users/branch-delete-api/?` +
      new URLSearchParams({ branch_id: branch_id, provider_id: provider_id }),
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
const getBranches = async (provider_id) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-list-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const createBranch = async (data) => {
  const response = await fetch(`${APIENDPOINT}/users/branch-create-api/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
    body: JSON.stringify({
      provider: data.provider,
      branch_name: data.branch_name,
      unit_number: data.unit_number,
      first_line: data.first_line,
      second_line: data.second_line,
      city: data.city,
      governorate: data.governorate,
      telephone_number: data.telephone_number,
    }),
  })
   if (response.ok){
    return response.json()
   }
   
};

const updateBranchTelephoneList = async ({ branch_id, provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-telephone-update-api/?` +
      new URLSearchParams({ branch_id: branch_id, provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const updateBranchAddress = async ({ branch_id, provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-update-api/?` +
      new URLSearchParams({ branch_id: branch_id, provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        branchaddress: data,
      }),
    }
  )
    .then(handleErrors)
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
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        name: data,
      }),
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

let getProfile = async (provider_id) => {
  let response = await fetch(
    `${APIENDPOINT}/users/provider-detail-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
};

const updateProviderTelephoneList = async ({ provider_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/branch-telephone-update-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const createProvider = async (data, user_id) => {
  const response = await fetch(`${APIENDPOINT}/users/provider/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      owner: user_id,
      address: {
        unit_number: data.address.unit_number,
        first_line: data.address.first_line,
        second_line: data.address.second_line,
        city: data.address.city,
        governorate: data.address.governorate,
      },
      telephone: {
        telephone_number: data.telephone_numbers.telephone_number,
      },
    }),
  });

  if (response.ok) {
    const data = response.json();

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
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        is_active: false,
      }),
    }
  );
};

const getAllEmployments = async (provider_id) => {
  const response = await fetch(
    `${APIENDPOINT}/users/employment-provider-list-api/?` +
      new URLSearchParams({ provider_id: provider_id }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
};

const createEmployment = async (staff_email, provider_id) => {
  const response = await fetch(`${APIENDPOINT}/users/employment-create/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),
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
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        // staff: staff_email,
        provider: provider_id,
      }),
    }
  );
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
};
