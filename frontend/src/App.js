import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterationPage from "./pages/registration/Registration.jsx";
import { useTranslation } from "react-i18next";
import Header from "./components/Header.jsx";
import "./app.css";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";

import  { AuthProvider } from "./context/AuthContext.jsx";
import StaffDashboard from "./pages/staff/StaffDashboard.jsx";
import ProtectedUserRoutes from "./components/ProtectedUserRoutes"
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import PatientRegistration from "./pages/provider/PatientRegsitrations"
import ProviderProfileUpdate from "./pages/provider/ProviderProfileUpdate.jsx";
import AddressUpdate from "./components/ui/AddressUpdate.jsx";
import ProviderLayout from "./pages/provider/ProviderLayout.jsx";
import ProviderRegistration from "./pages/provider/ProviderRegistration.jsx";
import RegistrationLayout from "./pages/registration/RegistrationLayout.jsx";
import RegistrationChoice from "./pages/registration/RegistrationChoice.jsx";
import RegistrationStaffMultiStep from "./pages/registration/RegistrationStaffMultiStep.jsx";
import Sidebar from "./components/ui/SideBar.jsx";
import ProviderStartEmployment from "./pages/provider/ProviderStartEmployment.jsx";
function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App {i18n.language === 'en' ? 'english': 'arabic'}">
      <AuthProvider>
      <Header />

      <Routes>
        <Route element={<ProtectedUserRoutes/>} >
             <Route element={<StaffDashboard/>} path="/staff-dashboard" />
             <Route element={<ProviderLayout/>} path="/provider/:id">
                <Route index element={<ProviderHome/>} />
                <Route element={<ProviderProfileUpdate/>} path="profile-update" />
                <Route element={<PatientRegistration/>} path="patient-registration"/>
                <Route element={<AddressUpdate/>} path="address-update" />
                <Route element={<ProviderStartEmployment/>} path="register-staff" />
             </Route>
             
              
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Login/>} path="/login" />

        <Route element={<RegistrationChoice/>} path="/registration-choice" />
        <Route element={<RegisterationPage />} path="/registration/staff" />


        <Route element={<RegistrationLayout/> }  path="/register">
          <Route element={<RegistrationStaffMultiStep />} path="staff" />
          <Route element={<ProviderRegistration/> } path="provider"/>
        </Route>
        
        <Route element={<h1>404</h1>} path="*" />

      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
