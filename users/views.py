import numbers
from tkinter.messagebox import QUESTION
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Account, Patient, TelephoneNumber
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import mixins

from . import utils

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET","POST"])
def telephonenumbers(request):
    numbers = TelephoneNumber.objects.all()
    serializer =TelephoneNumberSerializer(numbers, many=True)
    print(serializer.data)

    return Response(serializer.data)

@api_view(['GET', "POST", "PUT", "DELETE"])
def patient(request,):
    try:
        patient = Patient.objects.all()
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PatientProfileSerializer(patient, many=True)
        print(serializer.data)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PatientProfileSerializer(data=request.data)
        print(request)
        if serializer.is_valid():
            serializer.save()
            print(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'PUT':
    #     serializer = PatientSerializer(patient, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
    #     patient.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


# create patient
# view patient 
# update patient 
# 
class PatinetDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin):
    queryset=Patient.objects.all()
    serializer_class = PatientProfileSerializer
    lookup_field= "pk"

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

class PatientTestView(generics.GenericAPIView, mixins.RetrieveModelMixin, 
    mixins.ListModelMixin, mixins.CreateModelMixin
                 ):
    queryset= Account.objects.all()
    serializer_class = StaffAccountSerializer

    lookup_field= "pk"
    # lookup_url_kwarg = "pk"
    # pagination_class = DEFAULT_PAGINATION_CLASS 

    # def get_queryset(self):
    
    #     return super().get_queryset()

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)