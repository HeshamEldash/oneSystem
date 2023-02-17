from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from users.services import check_patient_clinican_relationship
from users.models import Patient
from django.shortcuts import get_object_or_404

class PatientPermissionMixin:
    """
        A Mixin to be used in the views to 1) ensure that any view that belongs to a patient record has 
        patient_id in the quesry_params 
        2) to get that patient object
        3) that patient object can then be passed to the check_object_permission method to check if the user 
        is allowed to enteract with that patient data 

    """
    def get_patient(self):
        patient_pk = self.request.query_params.get("patient_id", None)
        assert patient_pk is not None, ("any action related to a patient should have the patient_id in the query params")
        patient = get_object_or_404(Patient,pk = patient_pk)
        return patient





class CanViewMedicalRecords(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        staff = request.user.staff
        patient = obj
        relationship_exists = check_patient_clinican_relationship(staff=staff, patient=patient)[0]
        if relationship_exists:
            return True 
        return False 
    

class CanViewAdminRecords():
    pass 

class FullAccessMedicalRecord():
    pass