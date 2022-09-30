from django.urls import path
from .views import  *


app_name = 'records'
urlpatterns = [
    path("patients-records/", RecordListView.as_view(), name= "patients_records"),
    path("patients-record/<int:record_pk>/", RecordView.as_view(), name= "patients_record"),
    path("patients-past-conditions/", PastConditionsView.as_view(), name= "patients_past_conditions"),
    path("patients-past-condition/<int:condition_pk>/", PastConditionView.as_view(), name= "patients_past_condition"),

]