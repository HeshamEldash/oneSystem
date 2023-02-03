from django.urls import path
from .views import  *


app_name = 'appointments'
urlpatterns = [
    path("clinics/", ClinicView.as_view(), name= "clinics"),
    path("clinic/", ClinicDetailView.as_view(), name= "clinic"),
    path("sessions/", SessionView.as_view(), name= "sessions"),
    path("slot/", SlotView.as_view(), name= "slot"),
    path("appointment/", AppointmentView.as_view(), name= "appointment"),

    path("clinic-create/", ClinicCreateView.as_view(), name= "clinic"),

]