from django.shortcuts import render
from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
# Create your views here.

class ClinicView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Clinic.objects.all()

    serializer_class = ClinicSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 




class SessionView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):


    serializer_class = SessionSerializer

    def get_queryset(self):
        provider = self.request.query_params.get("provider_id")
        qs = Session.objects.filter(clinic__provider_id=provider)
        return qs



    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

