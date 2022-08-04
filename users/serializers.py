from django.forms import CharField, ChoiceField
from rest_framework import serializers
from . import utils
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["is_staff"] = user.is_staff
        token["email"] = user.email
        token["professional_number"] = user.professional_number
        token["staff_role"] = user.staff_role
        return token

class TelephoneNumberSerializer(serializers.ModelSerializer):
    
    telephone_number = serializers.CharField(max_length=30)
    class Meta:
        model = TelephoneNumber
        fields = ["telephone_number"]

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ["unit_number", "first_line",
        "second_line", "city", "governorate"
        ]

class PatientProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    first_name = serializers.CharField(max_length=100)
    middle_names = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()

    account = serializers.PrimaryKeyRelatedField(read_only=True)

    telephone_numbers = TelephoneNumberSerializer(source='phone_nums',many=True)
    address = AddressSerializer(source="address_set", many=True)

    def create(self, validated_data):
        return utils.create_patient_profile(**validated_data)
        
class PatientAccountSerializer(serializers.Serializer):

    id = serializers.CharField(read_only = True)
    email =serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    is_active = serializers.BooleanField(read_only=True)
    patient_profile = PatientProfileSerializer(source="patient", many=False)

    def create(self, validated_data):
        return utils.create_patient_account(**validated_data)

class StaffSerializer(serializers.Serializer):
    DOCTOR = "DR"
    NURSE = "NR"
    MANAGER = "MG"
    ADMIN = "AD"
    PRACTITIONER = "PC"
    ROLE_CHOICES = (
        (DOCTOR, _('Doctor')),
        (NURSE, _('Nurse')),
        (MANAGER, _('Manger')),
        (PRACTITIONER, _('Practitioner')),
        (ADMIN, _('Admin')),
    )

    id = serializers.CharField(read_only = True)
    first_name = serializers.CharField(max_length=100)
    middle_names = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    staff_role = serializers.ChoiceField(ROLE_CHOICES)
    professional_number = serializers.CharField()
    telephone_numbers = TelephoneNumberSerializer(source='phone_nums',many=True)

class StaffAccountSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    email =serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    is_active = serializers.BooleanField(read_only=True)
    staff_profile = StaffSerializer(source="staff", many=False)

    def create(self, validated_data):
        return utils.create_staff(**validated_data)

class ProviderSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    





# class PatientSerializer(serializers.ModelSerializer):
#     telephone_numbers = TelephoneNumberSerializer(source='phone_nums',many=True)
#     # patient_phone = serializers.CharField()
#     class Meta:
#         model = Patient
#         fields = "__all__"


#     def create(self, validated_data):
#         return create_patient_profile(**validated_data)

#     def update(self, instance, validated_data):
#         instance.title= validated_data.get("title", instance.title)
#         instance.first_name= validated_data.get("first_name", instance.first_name)
#         instance.middle_names= validated_data.get("middle_names", instance.middle_names)
#         instance.last_name = validated_data.get("last_name", instance.last_name)
#         instance.date_of_birth= validated_data.get("date_of_birth", instance.date_of_birth)