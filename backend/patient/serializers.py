from rest_framework import serializers
from .models import *




class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model= Weight
        fields = "__all__"
        extra_kwargs = {'patient': {'read_only': True}}

class BloodPressureSerializer(serializers.ModelSerializer):
    class Meta:
        model= BloodPressure
        fields = "__all__"
        extra_kwargs = {'patient': {'read_only': True}}



class TelephoneNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    telephone_number = serializers.CharField()

class PatientProfileDetailSerializer(serializers.Serializer):
    MALE = "MALE"
    FEMALE = "FEMALE"


    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female')
    )

    id = serializers.CharField(read_only=True)
    first_name = serializers.CharField(max_length=100)
    middle_names = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()
    gender= serializers.ChoiceField(GENDER_CHOICES)
    account = serializers.PrimaryKeyRelatedField(read_only=True)
    account_email = serializers.EmailField(source="account",read_only=True)
    telephone_numbers = TelephoneNumberSerializer(source='patienttelephonenumbers_set',many=True)
    