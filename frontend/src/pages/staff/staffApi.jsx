// staff-profile-detail/<int:pk>/

const APIENDPOINT = "http://127.0.0.1:8000";

const token = JSON.parse(localStorage.getItem("authTokens"));

// const { user, authTokens } = useContext(AuthContext);
let getStaffProfile = async (staff_id) => {
  let response = await fetch(`${APIENDPOINT}/users/staff-profile-detail/${staff_id}/`, {
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


export {getStaffProfile}