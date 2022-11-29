from django.shortcuts import render
from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
from rest_framework.response import Response
# Create your views here.
from rest_framework import status

class ClinicView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):

    serializer_class = ClinicSerializer

    def get_queryset(self):
        provider = self.request.query_params.get("provider_id")
        qs = Clinic.objects.filter(provider_id=provider)
        return qs
    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 



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



class AppointmentView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):

    serializer_class = AppointmentSerializer

    def get_queryset(self):
        slot_id = self.request.query_params.get("slot_id")
        qs = Slot.objects.get(id=slot_id)
        if self.request.method in ["POST"]:
            return qs
        if hasattr(qs, "appointment"):
            return qs.appointment
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
        return self.create(request, *args, **kwargs) 
