from django.shortcuts import render
from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
from rest_framework.response import Response
from rest_framework import serializers

# Create your views here.
from rest_framework import status

class ClinicView(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin):

    serializer_class = ClinicSerializer

    def get_queryset(self):
        provider = self.request.query_params.get("provider_id")
        qs = Clinic.objects.filter(provider_id=provider)
        return qs



    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

    def delete(self, request,*args, **kwargs):
        return self.destroy(request,*args, **kwargs)

class ClinicDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.DestroyModelMixin,):
    serializer_class = ClinicSerializer

    def get_object(self):
        clinic_id = self.request.query_params.get("clinic_id")
        obj = Clinic.objects.get(id=clinic_id)
        return obj
    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)
        
    def delete(self, request,*args, **kwargs):
        return self.destroy(request,*args, **kwargs)
     
class SessionView(generics.ListCreateAPIView):

    """ Can either accept one object or multiple in the post request"""
    serializer_class = SessionSerializer
    
    def get_queryset(self):
        provider = self.request.query_params.get("provider_id")
        qs = Session.objects.filter(clinic__provider_id=provider)
        return qs
   
    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        items = request.data 
        if isinstance(items, list):
            serializer = SessionSerializer(data=items, many=True)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(items, dict):
            return self.create(request, *args, **kwargs)



# TO DO////////

class SlotView(generics.GenericAPIView,mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):
    serializer_class = SlotSerializer

    def get_queryset(self):
        slot_id = self.request.query_params.get("slot_id")
        slot_obj = Slot.objects.get(id=slot_id)
        return slot_obj
    
    def get_object(self):
        return self.get_queryset()
    
    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class AppointmentWriteView(generics.GenericAPIView,mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):
    class InputSerializer(serializers.Serializer):
        patient_name = serializers.CharField(source="patient", read_only=True)
        
class AppointmentView(generics.GenericAPIView,mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):

    serializer_class = AppointmentSerializer

    def get_queryset(self):
        slot_id = self.request.query_params.get("slot_id")
        slot_obj = Slot.objects.get(id=slot_id)
        if self.request.method in ["POST", "PATCH"]:
            return slot_obj
        if hasattr(slot_obj, "appointment"):
            return slot_obj.appointment
        return None
        
    def get_object(self):
        return self.get_queryset()

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def delete(self, request,*args, **kwargs):
        if isinstance(self.get_object(), Appointment):
            return self.destroy(request,*args, **kwargs)
     
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        if self.get_object().status == "AV":
            return self.create(request, *args, **kwargs) 
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
