from django.urls import path
from .views import  *
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'
urlpatterns = [

    # path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password')

    path("patient-profile-detail/<int:pk>/", PatinetProfileDetailView.as_view(), name= "patient_profile"),
    path("patient-account-detail/<int:pk>/", PatientAccountDetailView.as_view(), name= "patient_account"),
    path("staff-profile-detail/<int:pk>/", StaffProfileDetailView.as_view(), name= "staff_profile"),
    path("staff-account-detail/<int:pk>/", StaffDetailView.as_view(), name= "staff_account"),
    path("staff-list/<int:pk>/", StaffListView.as_view(), name= "staff_list"),
    
    path("registration/<int:provider_pk>/<int:patient_pk>/",RegistrationDetailView.as_view(), name= "registration_detail"),
    path("registration-list/<int:provider_pk>/",RegistrationListView.as_view(), name= "registration_list"),
    
    path("provider/<int:pk>/", ProviderSerializer.as_view(), name = "provider"),
    
    path("testing/<int:pk>/", TestView.as_view(), name= "tetsing"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]