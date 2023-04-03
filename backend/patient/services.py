from django.core.exceptions import ObjectDoesNotExist, PermissionDenied, ValidationError
from django.db import IntegrityError
from django.shortcuts import get_object_or_404

from users.models import Account, Patient, PatientTelephoneNumbers


class PatinetService:

    @staticmethod
    def create_account(email: str, password: str):
        account = Account.objects.create_user(email=email, password=password)
        return account


    @staticmethod
    def create_profile(account_pk, first_name: str, middle_names: str, last_name: str, gender: str, date_of_birth: str,  telephone_number: str):
        
        account = Account.objects.get(pk=account_pk)
        
        patient_profile = Patient.objects.create(
            account=account, first_name=first_name, middle_names=middle_names,
            last_name=last_name, date_of_birth=date_of_birth, gender=gender
        )

        PatientTelephoneNumbers.objects.create(
            telephone_number=telephone_number, owner=patient_profile)
        
        return patient_profile
    
    @staticmethod
    def get_profile(account_pk):
        
        account = get_object_or_404(Account, pk=account_pk)
        
        patient = account.patient
        return patient