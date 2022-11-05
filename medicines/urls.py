from django.urls import path
from .views import  *


app_name = 'medicines'
urlpatterns = [
    path("prescription-list/", PrescriptionView.as_view(), name= "prescription_list"),
    path("regular-prescription-list/", RegularPrescriptionView.as_view(), name= "regular_prescription_list"),

    path("user-medication-preset/", UserMedicationPresetView.as_view(), name= "user_medication_preset"),
   
]