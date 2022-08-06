from django.urls import path
from .views import  *
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'
urlpatterns = [

    path("patient-profile-detail/<int:pk>/", PatinetProfileDetailView.as_view(), name= "patient_profile"),
    path("patient-account-detail/<int:pk>/", PatientAccountDetailView.as_view(), name= "patient_account"),
    path("staff-profile-detail/<int:pk>/", StaffProfileDetailView.as_view(), name= "staff_profile"),
    
    path("staff-account-detail/<int:pk>/", StaffDetailView.as_view(), name= "staff_account"),


    path("test_patient/<int:pk>/", PatientTestView.as_view(), name= "listPatient"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]