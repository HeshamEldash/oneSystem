import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import APIENDPOINT from "../api/apiEndpoint";


const TOKEN_ROTATION_INTERVAL_IN_MINS = 1000 * 60 * 4
const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  let loginUser = async (e) => {
    let response = await fetch(`${APIENDPOINT}/users/token/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: e.email,
        password: e.password,
      }),
    });

    if (response.status === 200) {
      let data = await response.json();
      let decoded = jwt_decode(data.access);

      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));

      setRefreshToken(data.refresh);
      localStorage.setItem("refreshToken", JSON.stringify(data?.refresh));

      setUser(decoded);
      return true;
    } else {
      throw false;
    }
  };

  let logoutUser = () => {
    setUser(null);
    setIsLoggingOut(true);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("provider");
    localStorage.removeItem("patient_id");
    navigate("/");
  };
  const contextData = {
    authTokens: authTokens,
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    erorr: error,
    isLoggingOut: isLoggingOut,
  };

  const rotateTokens = async () => {
    let response = await fetch(`${APIENDPOINT}/users/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    let data = await response.json();
    let decoded = jwt_decode(data.access);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(decoded);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      rotateTokens();
    }

    let interval_id = setInterval(() => {
      if (authTokens) {
        rotateTokens();
      }
    }, TOKEN_ROTATION_INTERVAL_IN_MINS);

    return () => clearInterval(interval_id);
  }, [authTokens, loading, refreshToken]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
