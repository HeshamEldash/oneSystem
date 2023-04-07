from django.urls import path
from users.views import MyTokenObtainPairView
from .views import  *
from medicines.views import RegularPrescriptionView, PrescriptionView, PatientAddRegularMedicationView, GetPatientAddedMedicationView

app_name = 'patient'
urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
 
    path("create-account/",PatientAccountCreateView.as_view(), name= "patient_account_create"),
    path("create-profile/",PatinetProfileCreateView.as_view(), name= "patient_profile_create"),
    
    path("get-profile/",PatientProfileGetView.as_view(), name= "patient_profile_get"),
    
    path("prescription-list/",PrescriptionView.as_view(), name= "prescription-view"),
    path("regular-prescription-list/",RegularPrescriptionView.as_view(), name= "regular-prescription-view"),
    
    path("add-regular-medication/",PatientAddRegularMedicationView.as_view(), name= "add-regular-medication"),
    path("get-regular-medication/",GetPatientAddedMedicationView.as_view(), name= "get-regular-medication"),
    
    path("create-weight/",WeightCreateView.as_view(), name= "create-weight"),
    path("get-weight-list/",WeightGetListView.as_view(), name= "get-weight-list"),
    
    path("create-blood-pressure/",BloodPressureCreateView.as_view(), name= "create-blood-pressure"),
    path("get-blood-pressure-list/",BloodPressureGetListView.as_view(), name= "get-blood-pressure-list"),
    
       
    
]