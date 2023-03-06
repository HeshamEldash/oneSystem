import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import RegisterationPage from "./pages/registration/Registration.jsx";
import Header from "./components/Header.jsx";
import "./app.css";
import "./newapp.css";
import "./utility.css";
import "./components/components.css";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedUserRoutes from "./components/ProtectedUserRoutes";
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import ProviderProfileUpdate from "./pages/provider/ProviderProfileUpdate.jsx";
import AddressUpdate from "./components/ui/AddressUpdate.jsx";
import ProviderRegistration from "./pages/provider/ProviderRegistration.jsx";
import RegistrationLayout from "./pages/registration/RegistrationLayout.jsx";
import RegistrationChoice from "./pages/registration/RegistrationChoice.jsx";
import RegistrationStaffMultiStep from "./pages/registration/RegistrationStaffMultiStep.jsx";
import "./components/ui/form/form.css";
import ProviderStartEmployment from "./pages/provider/ProviderStartEmployment.jsx";
import ProviderManageStaff from "./pages/provider/ProviderManageStaff.jsx";
import PatientRegistration from "./pages/patients/PatientRegistration.jsx";
import ProviderPatientRegistration from "./pages/provider/ProviderPatientRegistration.jsx.jsx";
import ProviderPatientSearch from "./pages/provider/ProviderPatientSearch.jsx";
import RecordLayout from "./pages/records/RecordLayout.jsx";
import RecordMain from "./pages/records/RecordMain.jsx";
import RecordProfile from "./pages/records/admin/RecordProfile.jsx";
import RecordPastHistory from "./pages/records/RecordPastHistory.jsx";
import ProviderManagePatients from "./pages/provider/ProviderManagePatients.jsx";
import RecordFiles from "./pages/records/RecordFiles.jsx";
import ProviderMainContainer from "./pages/provider/ProviderMainContainer.jsx";
import MedicationMain from "./pages/medications/MedicationMain.jsx";
import AppointmentPanel from "./pages/appointments/AppointmentPanel.jsx";
import AppointmentsWrapper from "./pages/appointments/AppointmentsWrapper.jsx";
import ClinicCreate from "./pages/appointments/appointmentsCreate/ClinicCreate.jsx";
import AppointmentsSchedulerFormik from "./pages/appointments/appointmentsCreate/AppointmentSchedulerFormik.jsx";
import StaffWrapper from "./pages/staff/StaffWrapper.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProviderNotAuthPage from "./pages/provider/ProviderNotAuthPage.jsx";
import Home from "./frontApp/views/home.jsx";



function App() {
  const {pathname} = useLocation()
  console.log(pathname)
  return (
    <div className="App {i18n.language === 'en' ? 'english': 'arabic'}">
      <AuthProvider>

      {pathname != "/" &&  <Header/>}

        <Routes>
          <Route element={<Home />} exact path="/" />

          <Route element={<ProtectedUserRoutes />}>
            <Route path="/app">
              <Route element={<StaffWrapper />} path="staff-dashboard" />
              <Route element={<ProviderMainContainer />} path="provider/:id">
                <Route index element={<ProviderHome />} />

                <Route
                  element={<ProviderProfileUpdate />}
                  path="profile-update"
                />
                <Route element={<AddressUpdate />} path="address-update" />
                <Route
                  element={<ProviderPatientRegistration />}
                  path="patient-registration"
                />
                <Route
                  element={<ProviderStartEmployment />}
                  path="register-staff"
                />
                <Route element={<ProviderManageStaff />} path="manage-staff" />
                <Route
                  index
                  element={<ProviderPatientSearch />}
                  path="search-patient"
                />
                <Route
                  index
                  element={<ProviderManagePatients />}
                  path="manage-patients"
                />

                <Route
                  element={<RecordLayout />}
                  path="patient-record/:patient_id"
                >
                  <Route index element={<RecordMain />} />
                  <Route element={<RecordProfile />} path="profile" />
                  <Route element={<RecordPastHistory />} path="past-history" />
                  <Route element={<RecordFiles />} path="files" />
                  <Route element={<MedicationMain />} path="medications" />
                </Route>

                <Route element={<AppointmentsWrapper />} path="appointments">
                  <Route index element={<AppointmentPanel />} />
                  <Route
                    element={<AppointmentsSchedulerFormik />}
                    path="appointment-scheduler"
                  />
                  <Route element={<ClinicCreate />} path="clinic-create" />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route
            element={<ProviderNotAuthPage />}
            path="/ProviderNotAuthPage"
          />

          <Route element={<Login />} path="/login" />
          <Route element={<RegistrationLayout />} path="/register">
            <Route element={<RegistrationStaffMultiStep />} path="staff" />
            <Route element={<ProviderRegistration />} path="provider" />
            <Route element={<PatientRegistration />} path="patient" />
          </Route>

          <Route element={<NotFound />} path="*" />
          {/* <Route element={<Home/>} path="/" /> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
