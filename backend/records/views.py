
from django.shortcuts import render
from .models import *
from users.models import Patient, Staff
from .serializers import *
from rest_framework import generics
from rest_framework import mixins
from django.shortcuts import get_object_or_404




class PatientIcdCodeView(generics.GenericAPIView, mixins.ListModelMixin,mixins.CreateModelMixin):

    serializer_class = PatientIcdCodeSerializer
    def get_queryset(self):
        patient_pk =  self.request.query_params.get('patient_id')
        qs = PatientIcdCode.objects.filter(patient= patient_pk)
        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**
    kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class RecordFilesView(generics.GenericAPIView, mixins.ListModelMixin,mixins.CreateModelMixin):

    serializer_class = RecordFileSerializer
    def get_queryset(self):
        patient_pk = self.kwargs.get('patient_pk')
        
        qs = RecordFile.objects.filter(patient= patient_pk)
        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**
    kwargs)  

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PastConditionView(generics.GenericAPIView,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):

    serializer_class = PastConditionsSerializer
    
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        qs = PastConditions.objects.filter(patient=patient_id)
        return qs   

    def get_object(self):
        condition_pk = self.kwargs['condition_pk']
        obj = get_object_or_404(PastConditions, pk=condition_pk)
        return obj

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)
    def delete(self, *args, **kwargs):
        return self.destroy(*args, **kwargs)

class PastConditionsView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):

    serializer_class = PastConditionsSerializer
    
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        qs = PastConditions.objects.filter(patient=patient_id)
        return qs   

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**
        kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class RecordListView(generics.GenericAPIView, 
                    mixins.ListModelMixin,
                     mixins.CreateModelMixin):
    serializer_class = RecordSerializer
    
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        qs = Record.objects.filter(patient=patient_id)
        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args,**
        kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)




class RecordView(generics.GenericAPIView,
                mixins.RetrieveModelMixin, 
                mixins.UpdateModelMixin):
    serializer_class = RecordSerializer

    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        qs = Record.objects.filter(patient=patient_id)
        return qs

    def get_object(self):
        record_pk = self.kwargs['record_pk']
        obj = get_object_or_404(Record, pk=record_pk)
        return obj

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args,**
        kwargs)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)