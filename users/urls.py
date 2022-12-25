from django.urls import path
from .views import  *
from .newViews import *
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'
urlpatterns = [

    # path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password')
        
    path("account-status/", AccountStatusView.as_view(), name= "account_status"),
    path("account-create/", CreateAccountView.as_view(), name= "account_create"),
    path("account-detail/<int:pk>/", AccountDetailView.as_view(), name= "account_detail"),

    path("patient-profile-create/", PatinetProfileCreateView.as_view(), name= "patient_profile_create"),
    path("patient-profile-detail/<int:pk>/", PatinetProfileDetailView.as_view(), name= "patient_profile"),
    path("patient-account-detail/<int:pk>/", PatientAccountDetailView.as_view(), name= "patient_account"),
    
    path("staff-profile-detail/<int:pk>/", StaffProfileDetailView.as_view(), name= "staff_profile"),
    path("staff-account-detail/<int:pk>/", StaffDetailView.as_view(), name= "staff_account"),
    path("staff-create/", StaffCreateView.as_view(), name= "create_staff_account"),

    path("staff-list/<int:pk>/", StaffListView.as_view(), name= "staff_list"),
    
    path("address-list/<str:owner_type>/<int:owner_pk>/", AddressListView.as_view()),
    path("address-detail/<int:pk>/", AddressDetailView.as_view(), name="address_detail"),

    path("telephone-number-detail/<int:pk>/", TelephoneDetailView.as_view(), name="telephone-number-detail/"),
    path("telephone-number-list/<str:owner_type>/<int:owner_pk>/", TelephoneListView.as_view()),

    path("registration/<int:provider_pk>/<int:patient_pk>/",RegistrationDetailView.as_view(), name= "registration_detail"),
    path("registration-list/<int:provider_pk>/",RegistrationListView.as_view(), name= "registration_list"),
    path("patient-create/",PatientAccountCreateView.as_view(), name= "patient_create"),
    
    path("provider/", ProviderCreateView.as_view(), name = "provider"),
    path("provider/<int:pk>/", ProviderDetailView.as_view(), name = "provider_detail"),
    

    path("employment-detail/<int:pk>/",EmploymentDetailView.as_view(), name= "emplyment-detail"),
    path("employment-create/",EmploymentProviderListView.as_view(), name= "emplyment-provider-list"),
    path("employment-provider-list/<int:pk>/",EmploymentProviderListView.as_view(), name= "emplyment-provider-list"),
    path("employment-staff-list/<int:pk>/",EmploymentStaffListView.as_view(), name= "emplyment-staff-list"),
    
    path("staff-login/<int:provider_pk>/<int:staff_pk>/", LoginToProviderEventView.as_view(), name="staff_logins"),
    path("staff-logins-list/<int:provider_pk>/<int:staff_pk>/", LoginToProviderEventViewList.as_view(), name="staff_logins"),
    

    
    
    
    
    
    path('search-patients/', SearchPatientView.as_view(), name='search_patients'),
    path('test/', ProviderCreateApi.as_view(), name='test'),
   
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # // new urls VVVVVVVV:
    
    path('provider-create-api/', ProviderCreateApi.as_view(), name='test'),
    path('provider-detail-api/', ProviderDetailApi.as_view(), name='test'),
    path('provider-update-api/', ProviderUpdateApi.as_view(), name='test'),
    
    path('branch-detail-api/', BranchDetailApi.as_view(), name='test'),
    path('branch-create-api/', BranchCreateApi.as_view(), name='test'),
    path('branch-delete-api/', BranchDeleteApi.as_view(), name='test'),
    path('branch-update-api/', BranchUpdateApi.as_view(), name='test'),
    path('branch-list-api/', BranchListApi.as_view(), name='test'),
    
    
    path('staff-create-api/', StaffCreateApi.as_view(), name='test'),
    path('staff-detail-api/', StaffDetailApi.as_view(), name='test'),
    path('staff-update-api/', StaffUpdateApi.as_view(), name='test'),
    
    
    path('address-list-api/', AddressListApi.as_view(), name='test'),
    path('address-detail-api/', AddressDetailApi.as_view(), name='test'),
    path('address-delete-api/', AddressDeleteApi.as_view(), name='test'),
    path('address-update-api/', AddressUpdateApi.as_view(), name='test'),
    
    path("employment-create-api/", EmploymentCreateApi.as_view()),
    path("employment-update-api/", EmploymentUpdateApi.as_view()),
    path("employment-provider-list-api/", EmploymentProviderListApi.as_view()),
    path("employment-staff-list-api/", EmploymentStaffListApi.as_view()),
    path("employment-deactivate-api/", EmploymentDeactivateApi.as_view()),
    path("employment-detail-api/", EmploymentDetailApiApi.as_view()),
    
    
    
    path("patient-provider-detail-api/", PatientProfileProviderDetailApi.as_view()),
    path("patient-provider-create-api/", PatientProfileProviderCreateApi.as_view()),
    
    
    
    
    
    
    
]