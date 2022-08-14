import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LanguageSelect from "./components/LanguageSelect.jsx";
import RegisterationPage from "./pages/registration/Registration.jsx";
import Reg from "./pages/registration/Reg.jsx";
import { useTranslation } from "react-i18next";
import Header from "./components/Header.jsx";
import "./app.css";
import RegistrationContext, {RegistrationProvider} from "./pages/registration/RegistraionContext"
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";

import AuthContext, { AuthProvider } from "./context/AuthContext.jsx";
import StaffDashboard from "./pages/staff/StaffDashboard.jsx";
import { useContext } from "react";
import ProtectedUserRoutes from "./components/ProtectedUserRoutes"
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import PatientRegistration from "./pages/provider/PatientRegsitrations"
import ProviderProfileUpdate from "./pages/provider/ProviderProfileUpdate.jsx";
import Address from "./components/Address.jsx";
import AddressUpdate from "./components/ui/AddressUpdate.jsx";
function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App {i18n.language === 'en' ? 'english': 'arabic'}">
      <RegistrationProvider>
      <AuthProvider>
      <Header />
      {/* <Address/> */}
      <Routes>
        <Route element={<ProtectedUserRoutes/>} >
             <Route element={<StaffDashboard/>} path="/staff-dashboard" />
              <Route element={<ProviderHome/>} path="/provider-home" />
              <Route element={<PatientRegistration/>} path="/provider-patient-registration" />
              <Route element={<ProviderProfileUpdate/>} path="/provider-profile-update" />
              <Route element={<AddressUpdate/>} path="/address-update" />
              
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Reg />} path="/reg" />
        <Route element={<Login/>} path="/login" />
        <Route element={<RegisterationPage />} path="/register" />
        
        <Route element={<h1>404</h1>} path="*" />

      </Routes>
      </AuthProvider>
     </RegistrationProvider>  
    </div>
  );
}

export default App;
