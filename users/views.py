from .models import Account, Patient, TelephoneNumber
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import mixins
from django.shortcuts import get_object_or_404

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# create patient
# view patient 
# update patient 
# change password
# Provider Serializer needs work,, mainly how to retireve the provider from the user side
# also how to list multiple provider/profiles

# class ChangePasswordView(generics.UpdateAPIView):

#     queryset = Account.objects.all()
#     # permission_classes = (IsAuthenticated,)
#     # serializer_class = ChangePasswordSerializer

class AccountStatusView(generics.GenericAPIView, mixins.RetrieveModelMixin,mixins.CreateModelMixin):
        queryset=Account.objects.all()
        serializer_class = AccountStatusSerializer

        # lookup_field  = "email"

        def get_object(self):
            queryset = self.get_queryset()
            email = self.request.data.get("email")
            return get_object_or_404(Account, email = email)

        def post(self, request, *args, **kwargs):
            return self.retrieve(request, *args,**kwargs)


class CreateAccountView(generics.GenericAPIView, mixins.CreateModelMixin):
        queryset=Account.objects.all()
        serializer_class = AccountSerializer

        def post(self, request, *args, **kwargs):
            return self.create(request, *args, **kwargs)


class PatinetProfileDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                                mixins.CreateModelMixin, mixins.UpdateModelMixin):
    queryset=Patient.objects.all()
    serializer_class = PatientProfileSerializer
 
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class PatientAccountDetailView(generics.GenericAPIView,mixins.UpdateModelMixin, 
                            mixins.RetrieveModelMixin,mixins.CreateModelMixin):
    
    queryset = Account.objects.all()
    serializer_class = PatientAccountSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StaffProfileDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                        mixins.CreateModelMixin, mixins.UpdateModelMixin):

    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class StaffDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                        mixins.CreateModelMixin, mixins.UpdateModelMixin):

    queryset = Account.objects.exclude(staff = None)
    serializer_class = StaffAccountSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class StaffCreateView(generics.GenericAPIView, 
                        mixins.CreateModelMixin):

    queryset = Account.objects.all()
    serializer_class = StaffAccountSerializer


    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StaffListView(generics.GenericAPIView,mixins.ListModelMixin ):
    serializer_class = StaffSerializer

    lookup_field  = "pk"
    
    def get_queryset(self):
        provider = Provider.objects.get(pk = self.kwargs["pk"])
        return provider.staff.all()

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

class RegistrationListView(generics.GenericAPIView,
        mixins.ListModelMixin,mixins.CreateModelMixin, mixins.UpdateModelMixin):

    serializer_class = RegistrationSerializer

    def get_queryset(self):
        provider = Provider.objects.get(pk = self.kwargs["provider_pk"])
        return provider.registration_set.all()


    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class RegistrationDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin,
        mixins.ListModelMixin,mixins.CreateModelMixin, mixins.UpdateModelMixin):
    

    
    # queryset= Registration.objects.all()        
    serializer_class = RegistrationSerializer
    lookup_field = "provider_pk"
    def get_queryset(self):
        provider = self.kwargs["provider_pk"]
        patient =  self.kwargs["patient_pk"]
        return Registration.objects.get(provider=provider, patient=patient)

    def get_object(self):
        queryset = self.get_queryset()
        return queryset

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class ProviderDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin,
mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    
    queryset = Provider.objects.all()
    serializer_class = ProviderDetailSerializer
    
    # def get_object(self):
    #     qs = self.queryset
    #     owner_pk = self.kwargs.get("pk")
    #     obj = qs.get(owner__pk =owner_pk )
    #     return obj


    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def delete(self, *args, **kwargs):
        return self.destroy(*args, **kwargs)

    def put(self, *args, **kwargs):
        return self.update(*args, **kwargs)


class ProviderCreateView (generics.GenericAPIView,mixins.CreateModelMixin):
    queryset = Provider.objects.all()
    serializer_class = ProviderCreateSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class EmploymentDetailView(generics.GenericAPIView, 
        mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = Employment.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["POST", "PUT"]:
            return EmploymentWriteSerializer 
        return EmploymentReadSerializer


    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class EmploymentProviderListView(generics.GenericAPIView, 
    mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin): 
    queryset = Employment.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["POST", "PUT"]:
            return EmploymentWriteSerializer 
        return EmploymentReadSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if pk:
            provider = Provider.objects.get(id=pk)
            queryset = Employment.objects.filter(provider=provider, is_active=True)
            return queryset

    def get(self,request, *args, **kwargs):

        return self.list(request, *args,**kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 




class EmploymentStaffListView(generics.GenericAPIView, 
    mixins.ListModelMixin, mixins.CreateModelMixin,mixins.UpdateModelMixin):
    queryset = Employment.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return EmploymentWriteSerializer 
        return EmploymentReadSerializer
    
    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if pk:
            staffAccount = Account.objects.get(id=pk)
            queryset = Employment.objects.filter(staff=staffAccount.staff, is_active=True)
            return queryset

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    

class LoginToProviderEventViewList(generics.GenericAPIView, mixins.CreateModelMixin, 
                mixins.ListModelMixin, mixins.RetrieveModelMixin):

    serializer_class = LoginToProviderEventSerializer
    def get_queryset(self):
        staff_pk = self.kwargs.get("staff_pk")
        provider_pk = self.kwargs.get("provider_pk")
        logins = LoginToProviderEvent.objects.filter(
            staff=staff_pk, provider=provider_pk)
        return logins    

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.latest("start_time")
        return obj

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class LoginToProviderEventView(generics.GenericAPIView,
              mixins.RetrieveModelMixin,mixins.UpdateModelMixin):

    serializer_class = LoginToProviderEventSerializer
    def get_queryset(self):
        staff_pk = self.kwargs.get("staff_pk")
        provider_pk = self.kwargs.get("provider_pk")
        logins = LoginToProviderEvent.objects.filter(
            staff=staff_pk, provider=provider_pk)
        return logins            

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.latest("start_time")
        return obj

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class AddressDetailView(generics.GenericAPIView,mixins.UpdateModelMixin,mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin, mixins.CreateModelMixin,):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class TestView(generics.GenericAPIView, mixins.RetrieveModelMixin, 
    mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin
                 ):
    queryset= Address.objects.all()
    serializer_class = AddressSerializer

    lookup_field= "email"
    lookup_url_kwarg = "email"
    # pagination_class = DEFAULT_PAGINATION_CLASS 

    # def get_queryset(self):
    
    #     return super().get_queryset()
    # def get_queryset(self):
    #     email = self.kwargs.get("email")
    #     if email:
    #         staffAccount = Account.objects.get(email=email)
    #         print (staffAccount.staff)
    #         queryset = Employment.objects.filter(staff=staffAccount.staff)
    #         return queryset
    #     else: 
    #         pk = self.kwargs.get("pk")
    #         return Employment.objects.filter(provider=pk)    

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)