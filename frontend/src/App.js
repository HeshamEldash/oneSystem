import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterationPage from "./pages/registration/Registration.jsx";
import { useTranslation } from "react-i18next";
import Header from "./components/Header.jsx";
import "./app.css";
import "./utility.css"
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";

import  { AuthProvider } from "./context/AuthContext.jsx";
import StaffDashboard from "./pages/staff/StaffDashboard.jsx";
import ProtectedUserRoutes from "./components/ProtectedUserRoutes"
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import ProviderProfileUpdate from "./pages/provider/ProviderProfileUpdate.jsx";
import AddressUpdate from "./components/ui/AddressUpdate.jsx";
import ProviderLayout from "./pages/provider/ProviderLayout.jsx";
import ProviderRegistration from "./pages/provider/ProviderRegistration.jsx";
import RegistrationLayout from "./pages/registration/RegistrationLayout.jsx";
import RegistrationChoice from "./pages/registration/RegistrationChoice.jsx";
import RegistrationStaffMultiStep from "./pages/registration/RegistrationStaffMultiStep.jsx";
import Sidebar from "./components/ui/SideBar.jsx";
import "./components/ui/form/form.css"
import ProviderStartEmployment from "./pages/provider/ProviderStartEmployment.jsx";
import ProviderManageStaff from "./pages/provider/ProviderManageStaff.jsx";
import PatientRegistration from "./pages/patients/PatientRegistration.jsx";
import PatientProviderRegistration from "./pages/patients/PatientProviderRegistration.jsx";
import ProviderPatientRegistration from "./pages/provider/ProviderPatientRegistration.jsx.jsx";
import ProviderPatientSearch from "./pages/provider/ProviderPatientSearch.jsx";
import RecordDisplay from "./pages/records/RecordDisplay.jsx";
import RecordEntry from "./pages/records/RecordEntry.jsx";
import RecordLayout from "./pages/records/RecordLayout.jsx";
import  { RecordContext, RecordContextProvider } from "./pages/records/context/RecordContext.jsx";
import Icd from "./externalapis/icd-10/Icd.jsx";
import RecordMain from "./pages/records/RecordMain.jsx";
import RecordProfile from "./pages/records/admin/RecordProfile.jsx";
function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App {i18n.language === 'en' ? 'english': 'arabic'}">
      <AuthProvider>

      <Header />
      {/* <Icd/> */}
      <Routes>
        <Route element={<ProtectedUserRoutes/>} >
             <Route element={<StaffDashboard/>} path="/staff-dashboard" />
             <Route element={<ProviderLayout/>} path="/provider/:id">
                <Route index element={<ProviderHome/>} />
                <Route element={<ProviderProfileUpdate/>} path="profile-update" />
                <Route element={<AddressUpdate/>} path="address-update" />
                <Route element={<ProviderPatientRegistration/>} path="patient-registration"/>
                <Route element={<ProviderStartEmployment/>} path="register-staff" />
                <Route element={<ProviderManageStaff/>} path="manage-staff" />
                <Route index element={<ProviderPatientSearch/>} path="search-patient" />
              
                   <Route element={<RecordLayout />} path="patient-record/:patient_id" >
                      <Route index element={<RecordMain/>} />
                      <Route element={<RecordProfile/>} path="profile"/>   
                   </Route>
             </Route>
             
              
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Login/>} path="/login" />

        <Route element={<RegistrationChoice/>} path="/registration-choice" />
        <Route element={<RegisterationPage />} path="/registration/staff" />
      

        <Route element={<RegistrationLayout/> }  path="/register">
          <Route element={<RegistrationStaffMultiStep />} path="staff" />
          <Route element={<ProviderRegistration/> } path="provider"/>
          <Route element={<PatientRegistration/>} path="patient"/>
        </Route>
        
        <Route element={<h1>404</h1>} path="*" />

      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
