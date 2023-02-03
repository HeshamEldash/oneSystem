import axios from 'axios';


export const api = {
  get: (url, params) =>
    axios.get(url, {
      headers: {
        token: JSON.parse(localStorage.getItem("authTokens"))?.access,
      },
      ...params,
    }),
  post: (url , data) =>
    axios.post(url, data, {
      headers: {
        token: JSON.parse(localStorage.getItem("authTokens"))?.access,
      },
    }),

  patch: (url , data) =>
    axios.patch(url, data, {
      headers: {
        token: JSON.parse(localStorage.getItem("authTokens"))?.access,
      },
    }),
    
  delete: (url ) =>
    axios.delete(url, {
      headers: {
        token: JSON.parse(localStorage.getItem("authTokens"))?.access,
      },
    }),
};