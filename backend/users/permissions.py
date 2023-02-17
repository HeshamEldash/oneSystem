from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.shortcuts import get_object_or_404
from .services import check_employment_exists,   check_manager_staff_relationship
from .models import *

class IsProviderOwnerPermission(BasePermission):
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        if obj.owner == user:
            return True
        return False
    
class IsProviderOwnerOrManagerPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user == obj.owner:
            return True
        if hasattr(user,"staff"):   
            employment = check_employment_exists(provider=obj, staff = user.staff) 
            if employment:
                if employment.employment_role == "MG":
                    return True 
        return False

class IsProviderAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user == obj.owner:
            return True
        if hasattr(user,"staff"):   
            employment = check_employment_exists(provider=obj, staff = user.staff) 
            if employment:
                if employment.employment_role == "MG":
                    return True 
                if employment.employment_role == "AD":
                    return True 
        return False
    
class IsProviderClinican(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        
        if user == obj.owner:
            return True
        if hasattr(user,"staff"):   
            employment = check_employment_exists(provider=obj, staff = user.staff) 
            clincian_roles = ["DR", "NR", "PC"]
            if employment:
                if employment.employment_role in clincian_roles:
                    return True 
        return False
    
    
class ViewOrEditStaff(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        staff = obj 
        if user.staff == obj:
            return True
        
        if check_manager_staff_relationship(staff=staff, manager=user):
            return True

        return False 

# class CanViewPatientAdmin(BasePermission):
    

class IsStaffProperty(BasePermission):
    """
    property has to have a field called staff
    """
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        if obj.staff == user.staff:
            return True
        return False
    
    
class IsAddressOwner(BasePermission):
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        if obj.owner == user:
            return True
        return False





# class CanViewPatientProfile(BasePermission):
    
#     def has_permission(self, request, view):
#         if request.user.is_authenticated:
#             return True
#         return False
    
#     def has_object_permission(self, request, view, obj):
#         user = request.user
        
#         if obj.owner == user:
#             return True
#         return False

class ProviderActionPermissionMixin:
    """
        A Mixin to be used in the views to 1) ensure that any view that belongs to a provider related action has 
        provider_id in the quesry_params 
        2) to get that proivder object
        3) that provider object can then be passed to the check_object_permission method to check if the user 
        is allowed to enteract with that provider data 

    """
    def get_provider(self):
        provider_pk = self.request.query_params.get("provider_id", None)
        assert provider_pk is not None, ("any action related to a provider should have the provider_id in the query params")
        provider = get_object_or_404(Provider,pk = provider_pk)
        return provider
