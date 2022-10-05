import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));

// const { user, authTokens } = useContext(AuthContext);

const searchPatients = async (values, provider_id) => {
  const params = new URLSearchParams(values);
  provider_id && params.append("provider", provider_id);

  const response = await fetch(
    `${APIENDPOINT}/users/testing/?` + new URLSearchParams(params),
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
    `${APIENDPOINT}/users/registration-list/${provider_id}` ,
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


let getProfile = async (provider_id) => {
  let response = await fetch(`${APIENDPOINT}/users/provider/${provider_id}/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
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

  if(response.ok){
    const data = response.json()
    console.log(data)
    return data
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
    `${APIENDPOINT}/users/employment-provider-list/${provider_id}`,
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
  getAllPatients
};
