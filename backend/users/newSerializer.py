from rest_framework import serializers
from . import utils
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _
from django.utils import timezone 



class TelephoneNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    telephone_number = serializers.CharField()
  
class AddressSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    unit_number = serializers.CharField()
    first_line = serializers.CharField()
    second_line = serializers.CharField(required=False)
    city = serializers.CharField()
    governorate = serializers.CharField()

class BranchDetailSerializer(serializers.Serializer):
    
    telephone_numbers = TelephoneNumberSerializer(source='branchtelephonenumbers_set',many=True, read_only=True)
    provider_name = serializers.CharField(source="provider")
    branchaddress   = AddressSerializer(many=False)
    branchaddress_pk = serializers.PrimaryKeyRelatedField(source="branchaddress",many=False, read_only=True)
    class Meta:
        model = Branch
        fields = "__all__"

class NewPatientProfileDetailSerializer(serializers.Serializer):
    MALE = "MALE"
    FEMALE = "FEMALE"


    GENDER_CHOICES = (
        (MALE, _('Male')),
        (FEMALE, _('Female'))
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
    address = AddressSerializer(source='patientaddress')
   
   
    

class NewProviderDetailSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    name = serializers.CharField(max_length=200)
    owner_email =serializers.CharField(source="owner")
    owner = serializers.SlugRelatedField(slug_field="pk", queryset = Account.objects.all())
    date_created = serializers.DateTimeField(read_only=True)
    telephone_numbers = TelephoneNumberSerializer(source="providertelephonenumbers_set", many=True, read_only=True)
    branches = BranchDetailSerializer(source="branch_set", many =True, read_only=True)
    
    
class NewStaffSerializer(serializers.Serializer):
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
    telephone_numbers = TelephoneNumberSerializer(source='stafftelephonenumbers_set',many=True)
    staff_email = serializers.EmailField(source="account" ,read_only=True)

   
class NewStaffAccountSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    email =serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    is_active = serializers.BooleanField(read_only=True)
    staff_profile = NewStaffSerializer(source="staff", many=False)