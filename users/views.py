from .models import Account, Patient, TelephoneNumber
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import mixins


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

class ProviderSerializer(generics.GenericAPIView, mixins.RetrieveModelMixin,
                mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    # lookup_field = "pk"
    # def get_object(self):

    #     pass

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
    queryset= Registration.objects.all()
    serializer_class = RegistrationSerializer

    # lookup_field= "pk"
    # lookup_url_kwarg = "pk"
    # pagination_class = DEFAULT_PAGINATION_CLASS 

    # def get_queryset(self):
    
    #     return super().get_queryset()

    def get(self,request, *args, **kwargs):
        return self.list(request, *args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)