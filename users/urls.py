from django.urls import path
from .views import  *
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'
urlpatterns = [

    # path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password')
        
    path("account-status/", AccountStatusView.as_view(), name= "account_status"),
    path("account-create/", CreateAccountView.as_view(), name= "account_create"),

    path("patient-profile-detail/<int:pk>/", PatinetProfileDetailView.as_view(), name= "patient_profile"),
    path("patient-account-detail/<int:pk>/", PatientAccountDetailView.as_view(), name= "patient_account"),

    
    path("staff-profile-detail/<int:pk>/", StaffProfileDetailView.as_view(), name= "staff_profile"),
    path("staff-account-detail/<int:pk>/", StaffDetailView.as_view(), name= "staff_account"),
    path("staff-create/", StaffCreateView.as_view(), name= "create_staff_account"),

    path("staff-list/<int:pk>/", StaffListView.as_view(), name= "staff_list"),
    
    path("address-detail/<int:pk>/", AddressDetailView.as_view(), name="address_detail"),

    path("registration/<int:provider_pk>/<int:patient_pk>/",RegistrationDetailView.as_view(), name= "registration_detail"),
    path("registration-list/<int:provider_pk>/",RegistrationListView.as_view(), name= "registration_list"),
    
    path("provider/", ProviderCreateView.as_view(), name = "provider"),
    path("provider/<int:pk>/", ProviderDetailView.as_view(), name = "provider_detail"),
    

    path("employment-detail/<int:pk>/",EmploymentDetailView.as_view(), name= "emplyment-detail"),
    path("employment-create/",EmploymentProviderListView.as_view(), name= "emplyment-provider-list"),
    path("employment-provider-list/<int:pk>/",EmploymentProviderListView.as_view(), name= "emplyment-provider-list"),
    path("employment-staff-list/<int:pk>/",EmploymentStaffListView.as_view(), name= "emplyment-staff-list"),
    
    path("staff-login/<int:provider_pk>/<int:staff_pk>/", LoginToProviderEventView.as_view(), name="staff_logins"),
    path("staff-logins-list/<int:provider_pk>/<int:staff_pk>/", LoginToProviderEventViewList.as_view(), name="staff_logins"),
    

   
   
    path("testing/<str:e>/", TestView.as_view(), name= "tetsing"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]