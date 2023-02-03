from django.shortcuts import get_object_or_404
from users.models import * 
from .models import Clinic
from users.services import check_employment_exists
from rest_framework import exceptions

class ClinicService:
    
    def create( self, branch:int, clinican:int, speciality:str, provider:int,):
        
        provider_obj =get_object_or_404(Provider, pk = provider)
        branch_obj =get_object_or_404(Branch, pk = branch)
        clinican_obj =get_object_or_404(Staff, pk = clinican)
        
        clinic = Clinic.objects.create(
        provider=  provider_obj,
        branch = branch_obj,
        clinican = clinican_obj,
        speciality = speciality
        )

        return clinic
    
        if check_employment_exists(provider=provider_obj, staff=clinican_obj):
        
            clinic = Clinic.objects.create(
            provider=  provider_obj,
            branch = branch_obj,
            clinican = clinican_obj,
            speciality = speciality
            )
        
            return clinic
