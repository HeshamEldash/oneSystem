const APIENDPOINT = "http://127.0.0.1:8000";


let getProfile = async (provider_id) => {
    let response = await fetch(`${APIENDPOINT}/users/provider/${provider_id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
        const data = response.json()
        return data
    } else{
        throw "An error has happened"
    }
  };


export {getProfile}  