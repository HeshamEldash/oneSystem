from django.urls import path
from .views import patient, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'
urlpatterns = [
    path("patient/<int:patient_id>", patient, name= "patient" ),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]