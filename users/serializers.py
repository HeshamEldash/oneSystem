
from dataclasses import fields
import email
from rest_framework import serializers
from . import utils
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _
from django.utils import timezone 



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

class AccountStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields= ["email"]

class AccountSerializer(serializers.ModelSerializer):
    email =serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Account
        fields= ["email", "password", "is_active"]

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class TelephoneNumberSerializer(serializers.ModelSerializer):
    
    telephone_number = serializers.CharField(max_length=30)
    class Meta:
        model = TelephoneNumber
        fields = ["telephone_number"]

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ["id","unit_number", "first_line",
        "second_line", "city", "governorate", "provider",
        "staff", "patient", "owner"
        ]

class PatientProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    first_name = serializers.CharField(max_length=100)
    middle_names = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()

    account = serializers.PrimaryKeyRelatedField(read_only=True)

    telephone_numbers = TelephoneNumberSerializer(source='phone_nums',many=True)
    address = AddressSerializer(many=False)

    def create(self, validated_data):
        return utils.create_patient_profile(**validated_data)

    def update(self, instance, validated_data):
        return utils.update_patient_profile(instance=instance, **validated_data)
         
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
   
    def update(self, instance, validated_data):
        utils.update_staff(instance, **validated_data)    
        return instance            

class StaffAccountSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    email =serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    is_active = serializers.BooleanField(read_only=True)
    staff_profile = StaffSerializer(source="staff", many=False)

    def create(self, validated_data):
        return utils.create_staff(**validated_data)

class ProviderDetailSerializer(serializers.Serializer):
    id = serializers.CharField(read_only = True)
    name = serializers.CharField(max_length=200)
    owner = serializers.SlugRelatedField(slug_field="pk", queryset = Account.objects.all())
    date_created = serializers.DateTimeField(read_only=True)

    address = AddressSerializer(source="address_set", many=True, read_only=True)
    telephone_numbers = TelephoneNumberSerializer(source='phone_nums',many=True, read_only=True)

    def delete(self, instance):
        instance.delete()
        
    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.owner = validated_data.get('owner', instance.owner )
        instance.save()

        return instance

class ProviderCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    owner = serializers.PrimaryKeyRelatedField( queryset = Account.objects.all())

    address = AddressSerializer(source="address_set", many=False, required=False)
    telephone = TelephoneNumberSerializer(source="telephonenumber_set", many=False, required=False)


    def create(self, validated_data):
        return utils.create_update_provider(**validated_data)


        

class RegistrationSerializer(serializers.ModelSerializer):
    """
    This serializer has a method to create a registration 
    another method that sets the state of the registration to inactive 
    """
    class Meta:
        model = Registration
        fields= "__all__"
        extra_kwargs = {'date_registered': {'read_only': True},
        'is_active': {'default': True}
        , 'date_registration_end': {'required': False, "allow_null":True}}
   
    def create(self, validated_data):
        return utils.create_registration( **validated_data)

    def update(self, instance, validated_data):
        self.Meta.extra_kwargs = {
        'date_registered': {'read_only': True},
        'patient': {'read_only': True},
        'provider': {'read_only': True},
        'is_active': {'default': True}, 
        'date_registration_end': {'required': False, "allow_null":True}
        }
        return utils.end_registration(instance)

class EmploymentReadSerializer(serializers.ModelSerializer):
    provider = serializers.SlugRelatedField(slug_field= "name", read_only=True, many=False)
    staff = serializers.SlugRelatedField(slug_field= "full_name", read_only=True, many=False)
    provider_id = serializers.IntegerField( read_only=True)
    staff_id = serializers.IntegerField( read_only=True)

    class Meta: 
        model= Employment
        fields = "__all__"



class EmploymentWriteSerializer(serializers.ModelSerializer):
    staff = serializers.EmailField()
    class Meta: 
        model= Employment
        fields = ["staff", "provider"]
        extra_kwargs = {'date_employed': {'read_only': True},
        'is_active': {'default': True}
        , 'date_registration_end': {'required': False, "allow_null":True}}

    def create(self, validated_data):
        staff_email = validated_data.get("staff")
        staff= Staff.objects.get(account__email=staff_email)
        # provider= Provider.objects.get(validated_data.get("provider"))
        provider= validated_data.get("provider")
        
        return Employment.objects.create(staff=staff, provider=provider)


    def update(self, instance, validated_data):
        self.Meta.extra_kwargs = {
        'date_employed': {'read_only': True},
        'staff': {'read_only': True, "required":False},
        'provider': {'read_only': True},
        'is_active': {'default': True}, 
        'date_employment_end': {'required': False, "allow_null":True}
        }
        return utils.end_registration(instance)

    
class LoginToProviderEventSerializer(serializers.ModelSerializer):

    class Meta: 
        model= LoginToProviderEvent
        fields = "__all__"   
        extra_kwargs = {
        'staff': {'read_only': False},
        'provider': {'read_only': False},    
        'start_time': {'read_only': True},
        'end_time': {'required': False, "allow_null":True}
        }
   
    def update(self, instance, validated_data):
        # self.Meta.extra_kwargs = {
        # 'staff': {'read_only': True},
        # 'provider': {'read_only': True}
        # }
        instance.end_time = timezone.now()
        instance.save()
        return instance
