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
    queryset = Clinic.objects.all()

    serializer_class = ClinicSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

# class TestSessionView(generics.ListCreateAPIView):

#     serializer_class = SessionSerializer
#     def get_queryset(self):
#         provider = self.request.query_params.get("provider_id")
#         qs = Session.objects.filter(clinic__provider_id=provider)
#         return qs

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args,**kwargs)  

#     def post(self, request, *args, **kwargs):
#         serialized = SessionSerializer(data=request.data, many=True)
#         if serialized.is_valid():
#             serialized.save()
#             return Response(serialized.data, status=status.HTTP_201_CREATED)
#         return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


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

  