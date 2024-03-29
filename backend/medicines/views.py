from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import   APIView
from rest_framework.response import Response
from rest_framework import status


from .services import patient_add_medication, get_patient_mediations

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
        if staff_pk:
            qs = UserMedicationPreset.objects.filter(staff=staff_pk)
            return qs

        staff= self.request.user.staff
        qs = UserMedicationPreset.objects.filter(staff=staff)
        return qs
        

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 




class PatientAddRegularMedicationView(APIView):
    
    permission_classes = [AllowAny]
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField()
        dose = serializers.CharField()
        
    
    def post(self, request, *args, **kwargs):
        patient_pk =  self.request.query_params.get('patient_id', None)
        
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        newMedication = patient_add_medication(patient_pk, **serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=PrescribedMedicationSerializer(newMedication).data)


class GetPatientAddedMedicationView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request): 
        patient_pk =  self.request.query_params.get('patient_id', None)
        repeat_medications = get_patient_mediations(patient_pk)
        print(repeat_medications)
        return Response(status=status.HTTP_200_OK, data=RepeatMedicationSerializer(repeat_medications, many=True).data)
        
        