from django.urls import path
from users.views import MyTokenObtainPairView
from .views import  *
from medicines.views import RegularPrescriptionView, PrescriptionView

app_name = 'patient'
urlpatterns = [
    path("create-account/",PatientAccountCreateView.as_view(), name= "patient_account_create"),
    path("create-profile/",PatinetProfileCreateView.as_view(), name= "patient_profile_create"),
    
    path("get-profile/",PatientProfileGetView.as_view(), name= "patient_profile_get"),
    
    path("prescription-list/",PrescriptionView.as_view(), name= "prescription-view"),
    path("regular-prescription-list/",RegularPrescriptionView.as_view(), name= "regular-prescription-view"),
    
    
    
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
]