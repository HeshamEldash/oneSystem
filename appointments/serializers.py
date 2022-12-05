from rest_framework import serializers
from .models import *
from users.serializers import StaffSerializer

from django.shortcuts import get_object_or_404
class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient", read_only=True)
    class Meta:
        model= Appointment
        fields = "__all__"
        extra_kwargs = {
            'slot': {'read_only': True},
            'clincian': {'read_only': True},
            }       

    def create(self, validated_data):
        slot_obj = self.context['view'].get_object()
        clincian_obj  =slot_obj.session.clinic.clinican
        patient_id = self.validated_data.get("patient")
        presentation = self.validated_data.get("presentation")
        # patient_obj = get_object_or_404(Patient, pk=patient_id)

        appointment = Appointment.objects.create(
            slot = slot_obj,
            clincian = clincian_obj,
            patient = patient_id,
            presentation = presentation
        )
        return appointment




class SlotSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(many=False, required=False, read_only=True)
    class Meta:
        model= Slot
        fields = "__all__"



# class TestSessionSerializer()
class SessionSerializer(serializers.ModelSerializer):
    """ 
        start, end are datetimes
        clinic & clinic ID are set differently becuase the default clinic field is showing are required=false
        slot_set is read only 
        slot duration is a number  

    [{
    "start": "2022-11-20T15:12:30Z",
    "end": "2022-11-20T18:00:00Z",
    "clinic_id": 1,
    "slot_duration": 5
        },
    {
    "start": "2022-11-20T15:12:30Z",
    "end": "2022-11-20T18:00:00Z",
    "clinic_id": 1,
    "slot_duration": 5
    }
    ]   



    """


    slot_set = SlotSerializer( many=True, read_only=True)
    slot_duration = serializers.IntegerField(write_only=True, required=True)
    clinic_id = serializers.PrimaryKeyRelatedField (queryset=Clinic.objects.all())

    class Meta:
        model= Session
        fields = ["id", "start", "end" , "clinic" ,"clinic_id", "slot_set", "slot_duration","clinician"]
        depth = 1



    def create(self, validated_data):
        clinic_pk = validated_data.get("clinic_id")
        start = validated_data.get("start")
        end = validated_data.get("end")
        slot_duration = validated_data.get("slot_duration")
        clinic = Clinic.objects.get(pk=clinic_pk.id)


        return Session.objects.create_with_slots(
        clinic=clinic, start=start,
        end=end, 
        slot_duration=slot_duration,
        )







class ClinicSerializer(serializers.ModelSerializer):
    clinican_details = StaffSerializer(source ="clinican" ,read_only = True)
    class Meta:
        model= Clinic
        fields = ["id", "speciality", "provider", "clinican", "clinican_details"]
        # depth = 1
