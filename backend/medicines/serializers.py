from rest_framework import serializers
from .models import *
from .utils import create_prescription
from django.utils.timezone import datetime


class PrescribedMedicationSerializer(serializers.ModelSerializer):
    date_created = serializers.SerializerMethodField(method_name="date_created_method")
    class Meta:
        model = PrescribedMedication
        fields = "__all__"

    def date_created_method(self, obj):
        try:
            date = obj.prescription_set.first().date_created
            return date.date()
        except:
            return None


class RepeatMedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepeatMedication
        fields = "__all__"

 
    

class PrescriptionSerializer(serializers.ModelSerializer):
    medications = PrescribedMedicationSerializer(many=True)
    prescriber_name = serializers.CharField(source="prescriber", read_only=True)
    provider_name = serializers.CharField(source="provider", read_only=True)
    
    class Meta:
        model = Prescription
        fields = "__all__"
        extra_kwargs = {'prescriber': {'required': False},
        }
 
    def create(self, validated_data):
        prescriber = self.context["request"].user.staff
        return create_prescription(validated_data,prescriber, **self.initial_data)






class UserMedicationPresetSerializer(serializers.ModelSerializer):
    medication = PrescribedMedicationSerializer(many=False)

    class Meta:
        model = UserMedicationPreset
        fields = ["staff", "medication" ]
        extra_kwargs = {'rxcui': {'required': False},

        }
    def create(self, validated_data):
        # staff = self.context["request"].user.staff
        staff=validated_data["staff"]
        med_data = validated_data.get("medication", None)
        medicaiton = PrescribedMedication.objects.create(**med_data)
        return UserMedicationPreset.objects.create(staff=staff, medication=medicaiton)
        
