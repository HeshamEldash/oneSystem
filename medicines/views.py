from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from .models import *

# Create your views here.


class PrescriptionView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):

    serializer_class = PrescriptionSerializer
    def get_queryset(self):
    
        patient_pk =  self.request.query_params.get('patient_id', None)
        staff_pk =  self.request.query_params.get('staff_id', None)
        if patient_pk:
            qs = Prescription.objects.filter(patient=patient_pk )
            return qs
        elif staff_pk:
            qs = Prescription.objects.filter(prescriber =staff_pk )
            return qs
     
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 


class RegularPrescriptionView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = PrescribedMedicationSerializer
    def get_queryset(self):
        patient_pk =  self.request.query_params.get('patient_id', None)
        qs = PrescribedMedication.objects.filter(prescription__patient_id=patient_pk, is_regular = True )
        return qs 
    

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  


class UserMedicationPresetView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    serializer_class = UserMedicationPresetSerializer

    def get_queryset(self):
        staff_pk =  self.request.query_params.get('staff_id', None)
        qs = UserMedicationPreset.objects.filter(staff=staff_pk)
        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

