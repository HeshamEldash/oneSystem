import APIENDPOINT from "../../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));

const getPatientProfile = async (patient_id) => {
  let response = await fetch(
    `${APIENDPOINT}/users/patient-profile-detail/${patient_id}/`,
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

const getPatientRecords = async (patient_id) => {
  let response = await fetch(
    `${APIENDPOINT}/records/patients-records/?` +
      new URLSearchParams({ patient_id: patient_id }),
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

const createRecord = async (patient_id, recordEntry, is_public) => {
  let response = await fetch(`${APIENDPOINT}/records/patients-records/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
    body: JSON.stringify({
      history: recordEntry.history,
      examination: recordEntry.examination,
      diagnosis: recordEntry.diagnosis,
      managment_plan: recordEntry.plan,
      is_public: is_public,
      patient: parseInt(patient_id),
    }),
  });
};

const updateRecord = async (record_id, recordEntry, is_public) => {
  let response = await fetch(
    `${APIENDPOINT}/records/patients-record/${record_id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        history: recordEntry.history,
        examination: recordEntry.examination,
        diagnosis: recordEntry.diagnosis,
        managment_plan: recordEntry.plan,
        is_public: is_public,
      }),
    }
  );
};

const updatePatinetProfile = async (data, profileId) => {
  await fetch(`${APIENDPOINT}/users/patient-profile-detail/${profileId}/`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
    body: JSON.stringify({
      first_name: data.first_name,
      middle_names: data.middle_names,
      last_name: data.last_name,
      gender: data.gender,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
    }),
  });
};

const createPastCodition = async (patient_id, values) => {
  let response = await fetch(
    `${APIENDPOINT}/records/patients-past-conditions/?` +
      new URLSearchParams({ patient_id: patient_id }),
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        condition: values.condition,
        icd_code: values.icd_code,
        date_diagnosed: values.date_diagnosed,
        patient: parseInt(patient_id),
      }),
    }
  );
};

const getIcdList = async (patient_id) =>{
  let response = await fetch(
    `${APIENDPOINT}/records/patients-icd-codes/?` +
      new URLSearchParams({ patient_id: patient_id }),
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

}

const getPastCoditions = async (patient_id) => {
  let response = await fetch(
    `${APIENDPOINT}/records/patients-past-conditions/?` +
      new URLSearchParams({ patient_id: patient_id }),
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

const deletePastCodition = async (patient_id, condition_id) => {
  let response = await fetch(
    `${APIENDPOINT}/records/patients-past-condition/${condition_id}?` +
      new URLSearchParams({ patient_id: patient_id }),
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );
};

const getRecordFiles = async (patient_id)=>{
  const response = await fetch(
    `${APIENDPOINT}/records/patients-records-files/${patient_id}/`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data
  }

}

export {
  getPatientProfile,
  getPatientRecords,
  createRecord,
  updateRecord,
  updatePatinetProfile,
  createPastCodition,
  getPastCoditions,
  deletePastCodition,
  getRecordFiles,
  getIcdList,

};
