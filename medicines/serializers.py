from rest_framework import serializers
from .models import *
from .utils import create_prescription



class PrescribedMedicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrescribedMedication
        fields = "__all__"


class PrescriptionSerializer(serializers.ModelSerializer):
    medications = PrescribedMedicationSerializer(many=True)
    class Meta:
        model = Prescription
        fields = "__all__"
        extra_kwargs = {'prescriber': {'required': False},
        }
 
    def create(self, validated_data):
        prescriber = self.context["request"].user.staff
        return create_prescription(validated_data,prescriber, **self.initial_data)
