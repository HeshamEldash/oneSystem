from django.urls import path
from .views import  *


app_name = 'appointments'
urlpatterns = [
    path("clinics/", ClinicView.as_view(), name= "clinics"),
    path("sessions/", SessionView.as_view(), name= "clinics"),

]