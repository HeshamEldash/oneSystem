from multiprocessing import context
from .models import Account, Patient, TelephoneNumber
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework.permissions import AllowAny,IsAuthenticated 
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework import status
from .services import *
from .permissions import *
from .newSerializer import NewProviderDetailSerializer, NewPatientProfileDetailSerializer
# //////////////////////// MIXINS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class UpdateObjectApiMixin:
    
    look_up = None
    look_up_model = None
    serializer = None

    
    def get_object(self):
        assert self.look_up is not None, ("look_up field should be set as a string")
        pk = self.request.query_params.get(self.look_up)
        
        assert self.look_up_model is not None, ("look_up_model field should be set")
        
        obj = get_object_or_404(self.look_up_model ,pk=pk)   
      
        return obj
    
    def perform_update(self, request,instance, **kwargs):
        return None
        
        
    def patch(self, request, *args, **kwargs):
        serializer = self.serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        self.perform_update(instance, request,**serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=serializer.data )  
    
class GetObjectMixn:
    """_summary_
      A costum mixin for detail view to handle object retrive 
      in order to use need to override look_up field which is the key in the query_params 
      override look_up_obj which is the Model name  & the serializer field which is the serializer 
    
     offers a get method that can be used in the view 
    """
    look_up = None
    look_up_model = None
    serializer = None
    def get_object(self):
        assert self.look_up is not None, ("look_up field should be set as a string")
        pk = self.request.query_params.get(self.look_up)
        
        assert self.look_up_model is not None, ("look_up_model field should be set")
        
        obj = get_object_or_404(self.look_up_model ,pk=pk)      
        return obj
    
    def get(self, request, *args, **kwargs):
        assert self.serializer is not None, ("serializer field should be set")
        obj =  self.get_object()   
        self.check_object_permissions(request, obj)
        serializer = self.serializer(obj) 
        return  Response(serializer.data )  


# //////////////////////// Address APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class AddressListApi(APIView):
    # SHOULD NOT BE USED AS MOST ARE ONE TO ONE FIELD
    def get(self, request):
        owner_id = request.query_params.get("owner_pk")
        owner_type = request.query_params.get("owner_type")
        address_list = get_address_list(owner_id= owner_id, owner_type=owner_type)
        data = AddressSerializer(address_list, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)

class AddressDetailApi(APIView, GetObjectMixn):
    look_up = "address_id"
    look_up_model = Address
    serializer = AddressSerializer 
    
class AddressDeleteApi(APIView):
    permission_classes = [IsAddressOwner]
    def delete(self, request, *args, **kwargs):
        address_pk = request.query_params.get("address_id")
        address_obj = get_object_or_404(Address,pk=address_pk) 
        self.check_object_permissions(request=request, obj=address_obj)
        address_obj.delete()
        return Response(status=status.HTTP_200_OK )   

class AddressUpdateApi(APIView):
    class InputSerializer(serializers.Serializer):
        unit_number = serializers.CharField(required=False)
        first_line = serializers.CharField(required=False)
        second_line = serializers.CharField(required=False)
        city = serializers.CharField(required=False)
        governorate = serializers.CharField(required=False)    
           
    def get_object(self):
        pk =self.request.query_params.get("address_id")    
        obj = get_object_or_404(Address ,pk=pk)    
        return obj
     
        
    def patch(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        address_obj = address_update(instance,**serializer.validated_data)
    
        output_serializer = self.InputSerializer(address_obj)
        return Response(status=status.HTTP_200_OK, data= output_serializer.data)  
      
    
# //////////////////////// Staff APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class StaffCreateApi(APIView):
    permission_classes = [AllowAny]
    class InputSerializer(serializers.Serializer):
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
        email = serializers.EmailField()
        password = serializers.CharField(
            write_only=True, style={'input_type': 'password'})
        first_name = serializers.CharField(max_length=100)
        middle_names = serializers.CharField(max_length=100)
        last_name = serializers.CharField(max_length=100)
        professional_number = serializers.CharField(max_length=100, required=False)
        staff_role = serializers.ChoiceField(ROLE_CHOICES)
        telephone_number = serializers.CharField(max_length=100)

    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        staff = StaffService().staff_create(**serializer.validated_data)
        return Response(status=status.HTTP_200_OK)   

class StaffUpdateApi(APIView,UpdateObjectApiMixin):
    # authenticated >  yes
    permission_classes = [ViewOrEditStaff]
    class InputSerializer(serializers.Serializer):
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

        first_name = serializers.CharField(max_length=100,required=False )
        middle_names = serializers.CharField(max_length=100, required=False)
        last_name = serializers.CharField(max_length=100, required=False)
        professional_number = serializers.CharField(max_length=100, required=False)
        staff_role = serializers.ChoiceField(ROLE_CHOICES, required=False)

    
    look_up = "staff_id"
    look_up_model = Staff
    serializer = InputSerializer
    
    def perform_update(self, instance,request, **serializer_data):
        return StaffService().update_staff(instance, **serializer_data )
    
class StaffDetailApi(APIView,GetObjectMixn):
    
    permission_classes = [ViewOrEditStaff]

    look_up = "staff_id"
    look_up_model = Staff
    serializer = StaffSerializer


# //////////////////////// Branch APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class BranchDetailApi(APIView, GetObjectMixn):
    # authenticated >  no
    permission_classes = [AllowAny]
    look_up = "branch_id"
    look_up_model = Branch
    serializer = BranchDetailSerializer

class BranchCreateApi(APIView):

    permission_classes = [IsProviderOwnerOrManagerPermission]
    class InputSerializer(serializers.Serializer):
        provider = serializers.PrimaryKeyRelatedField(queryset = Provider.objects.all())
        branch_name = serializers.CharField()
        unit_number = serializers.CharField()
        first_line = serializers.CharField()
        second_line = serializers.CharField(required=False)
        city = serializers.CharField()
        governorate = serializers.CharField()
        telephone_number = serializers.CharField()

    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        BranchService().create(**serializer.validated_data)     
        return  Response(status=status.HTTP_200_OK  )   

class BranchDeleteApi(APIView):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    def delete(self, request, *args, **kwargs):
        branch_pk = request.query_params.get("branch_id")
        branch_obj = get_object_or_404(Branch,pk=branch_pk) 
        branch_obj.delete()
        return Response(status=status.HTTP_200_OK )   

class BranchUpdateApi(APIView, UpdateObjectApiMixin):

    permission_classes = [IsProviderOwnerOrManagerPermission]
    class InputSerializer(serializers.Serializer):
        branch_name = serializers.CharField(required=False)
    
    look_up = "branch_id"
    look_up_model = Branch
    serializer = InputSerializer
    def perform_update(self, instance, **serializer_data):
        return BranchService().update(instance, **serializer_data )

class BranchListApi(APIView):

    permission_classes = [AllowAny]
    def get(self, request):
        provider_id = request.query_params.get("provider_id")
        branch_list = BranchService().branch_list_get(provider_pk=provider_id)    
        data = BranchDetailSerializer(branch_list, many=True).data
        return Response(data)
        
# //////////////////////// Provider APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class ProviderCreateApi(APIView): 
    permission_classes = [IsAuthenticated ]
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField()
        branch_name = serializers.CharField()
        unit_number = serializers.CharField()
        first_line = serializers.CharField()
        second_line = serializers.CharField(required=False)
        city = serializers.CharField()
        governorate = serializers.CharField()
        telephone_number = serializers.CharField()
    
    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        user=self.request.user 
        provider_create( owner=user, **serializer.validated_data)       
        return Response(status=status.HTTP_200_OK )   

class ProviderDetailApi(APIView, GetObjectMixn):
    permission_classes = [AllowAny]
    look_up = "provider_id"
    look_up_model = Provider
    serializer = NewProviderDetailSerializer

class ProviderUpdateApi(APIView, UpdateObjectApiMixin):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=200, required=False)
        owner = serializers.SlugRelatedField(slug_field="pk", queryset = Account.objects.all(), required=False)
    
    look_up = "provider_id"
    look_up_model = Provider
    serializer = InputSerializer
    

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        self.perform_update(instance, request,**serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=serializer.data )  
    
# //////////////////////// Employment APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class EmploymentDetailApiApi(APIView,GetObjectMixn,ProviderActionPermissionMixin ):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    look_up = "employment_id"
    look_up_model = Employment
    serializer = EmploymentReadSerializer

    def get(self, request, *args, **kwargs):
        obj =  self.get_object()   
        provider = self.get_provider()
        self.check_object_permissions(request, provider)
        serializer = self.serializer(obj) 
        return  Response(serializer.data )  

class EmploymentDeactivateApi(APIView, ProviderActionPermissionMixin):
    permission_classes = [IsProviderOwnerOrManagerPermission]
  
    def get_object(self):
        pk = self.request.query_params.get("employment_id")
        obj = get_object_or_404(Employment ,pk=pk)   
        return obj
           
    def patch(self, request, *args, **kwargs):
        employment = self.get_object()
        provider = self.get_provider()
        self.check_object_permissions(request,  provider)
        ended_empoyment = end_employment(employment)
        return  Response(status=status.HTTP_200_OK, data=EmploymentReadSerializer(ended_empoyment).data )  
          
class EmploymentProviderListApi(APIView, ProviderActionPermissionMixin):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    
    def get(self, request):
        provider_id = request.query_params.get("provider_id")
        provider = self.get_provider()
        self.check_object_permissions(request, provider)
        provider_list = get_provider_employment_list(provider_pk=provider_id)    
        data = EmploymentReadSerializer(provider_list, many=True).data
        return Response(data)

class EmploymentUpdateApi(APIView,UpdateObjectApiMixin, ProviderActionPermissionMixin):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    class InputSerializer(serializers.Serializer):
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

        salary = serializers.DecimalField(max_digits=6,decimal_places=2, required=False)
        employment_role = serializers.ChoiceField(ROLE_CHOICES, required=False)
    
    look_up = "employment_id"
    look_up_model = Employment
    serializer = InputSerializer

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.get_object()
        provider = self.get_provider()
        self.check_object_permissions(request, provider)
        updated_employment = update_employment(instance,**serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=EmploymentReadSerializer(updated_employment).data )  
     
class EmploymentCreateApi(APIView):
    permission_classes = [IsProviderOwnerOrManagerPermission]
    class InputSerializer(serializers.Serializer):
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
        provider = serializers.IntegerField()
        staff = serializers.IntegerField()
        salary = serializers.DecimalField(max_digits=6,decimal_places=2)
        employment_role = serializers.ChoiceField(ROLE_CHOICES)
    
    def post(self,request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True)  
        provider_instance = get_object_or_404(Provider,pk = serializer.validated_data["provider"])
        self.check_object_permissions(request, provider_instance)
        emp = create_employment(**serializer.validated_data) 
        if emp:
            return Response(status=status.HTTP_201_CREATED, data=EmploymentReadSerializer(emp).data )   
        return Response(status=status.HTTP_404_NOT_FOUND,  data="There was an error creating this employment")  

class EmploymentStaffListApi(APIView, ProviderActionPermissionMixin):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if hasattr(user, "staff"):
            employment_list = get_staff_provider_list(user.staff)    
            data = EmploymentReadSerializer(employment_list, many=True).data
            return Response(data)
        return Response(status=status.HTTP_404_NOT_FOUND)


# //////////////////////// Patient APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
class PatientProfileProviderDetailApi(APIView,ProviderActionPermissionMixin):
    permission_classes = [IsProviderAdmin, IsProviderClinican]  
    def get(self,request,*args, **kwargs):
        
        # TODO: add emergency retrieve method 
        """_summary_
            2 checks happen in this method to allow a patient profile to be retrived. 
            The first is in the check_object_permission, This checks if the user is part of the provider staff
            The second check in the PatientProviderService. This checks if the registration betweent the provider and patient exists 
            If any of these checks fails this raises a permission error 
        """
        patient_pk = request.query_params.get("patient_id")
        provider= self.get_provider()
        patient = PatientProviderService(provider).get_patient_profile(patient_pk=patient_pk)
        
        self.check_object_permissions(request, provider)
        serializer = PatientProfileSerializer(patient)
        data = serializer.data 
        return Response(status=status.HTTP_200_OK, data=data)
                   
class PatientProfileProviderCreateApi(APIView, ProviderActionPermissionMixin):
    permission_classes = [IsProviderAdmin, IsProviderClinican]  
    
    class InputSerializer(serializers.Serializer):
        MALE = "MALE"
        FEMALE = "FEMALE"
        GENDER_CHOICES = (
            (MALE, _('Male')),
            (FEMALE, _('Female'))
        )
        
        first_name = serializers.CharField(max_length=100)
        middle_names = serializers.CharField(max_length=100, required=False)
        last_name = serializers.CharField(max_length=100)
        date_of_birth = serializers.DateField()
        gender= serializers.ChoiceField(GENDER_CHOICES)
        telephone_number = serializers.CharField(max_length=100)
        unit_number = serializers.CharField(required=False)
        first_line = serializers.CharField(required=False)
        second_line = serializers.CharField(required=False)
        city = serializers.CharField(required=False)
        governorate = serializers.CharField(required=False)
    
    def post(self,request,*args, **kwargs):
        serializer = self.InputSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True)  
        provider = self.get_provider()
        self.check_object_permissions(request, provider)
        patient_obj = PatientProviderService(provider=provider).create_patient_and_registration(**serializer.validated_data)
    
        return Response(status=status.HTTP_201_CREATED, data=NewPatientProfileDetailSerializer(patient_obj).data )    
          
class PatientProfileProviderUpdateApi():
    pass     
        
    
# //////////////////////// Registration APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    
    
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# //////////////////////// Model APIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
