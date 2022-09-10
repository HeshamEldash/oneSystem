from django.urls import path
from .views import  *


app_name = 'records'
urlpatterns = [
    path("patients-records/", RecordListView.as_view(), name= "patients_records"),
    path("patients-record/<int:record_pk>/", RecordView.as_view(), name= "patients_record"),

]