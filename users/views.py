from multiprocessing import context
from .models import Account, Patient, TelephoneNumber
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework import status
from .services import provider_create

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



    
    
class AccountStatusView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    queryset = Account.objects.all()
    serializer_class = AccountStatusSerializer

    # lookup_field  = "email"

    def get_object(self):
        queryset = self.get_queryset()
        email = self.request.data.get("email")
        return get_object_or_404(Account, email=email)

    def post(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class CreateAccountView(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class AccountDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    serializer_class = AccountDetailSerializer
    queryset = Account.objects.all()

    def get_object(self):
        # self.request.query_params()
        pk = self.kwargs.get("pk")
        return self.queryset.get(pk=pk)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class PatinetProfileCreateView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                               mixins.CreateModelMixin, mixins.UpdateModelMixin):
    queryset = Patient.objects.all()
    serializer_class = PatientProfileSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PatinetProfileDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                               mixins.CreateModelMixin, mixins.UpdateModelMixin):
    queryset = Patient.objects.all()
    serializer_class = PatientProfileSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class PatientAccountDetailView(generics.GenericAPIView, mixins.UpdateModelMixin,
                               mixins.RetrieveModelMixin, mixins.CreateModelMixin):

    queryset = Account.objects.all()
    serializer_class = PatientAccountSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **
                             kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PatientAccountCreateView(generics.GenericAPIView, mixins.UpdateModelMixin,
                               mixins.RetrieveModelMixin, mixins.CreateModelMixin):

    queryset = Account.objects.all()
    serializer_class = PatientAccountSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class StaffProfileDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                             mixins.CreateModelMixin, mixins.UpdateModelMixin):

    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class StaffDetailView(generics.GenericAPIView,  mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin, mixins.UpdateModelMixin):

    queryset = Account.objects.exclude(staff=None)
    serializer_class = StaffAccountSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

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


class StaffListView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = StaffSerializer

    lookup_field = "pk"

    def get_queryset(self):
        provider = Provider.objects.get(pk=self.kwargs["pk"])
        return provider.staff.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RegistrationListView(generics.GenericAPIView,
                           mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):

    serializer_class = RegistrationSerializer

    def get_queryset(self):
        provider = Provider.objects.get(pk=self.kwargs["provider_pk"])
        return provider.registration_set.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class RegistrationDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin,
                             mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):

    # queryset= Registration.objects.all()
    serializer_class = RegistrationSerializer
    lookup_field = "provider_pk"

    def get_queryset(self):
        provider = self.kwargs["provider_pk"]
        patient = self.kwargs["patient_pk"]
        return Registration.objects.get(provider=provider, patient=patient)

    def get_object(self):
        queryset = self.get_queryset()
        return queryset

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class ProviderDetailView(generics.GenericAPIView, mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin, mixins.UpdateModelMixin):

    queryset = Provider.objects.all()
    serializer_class = ProviderDetailSerializer

    def get_object(self):
        qs = self.queryset

        q_params = self.request.query_params
        if q_params.get("owner_id"):
            owner_id = q_params.get("owner_id")
            obj = qs.get(owner__pk=owner_id)
            return obj

        else:

            return qs.get(id=self.kwargs.get("pk"))

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, *args, **kwargs):
        return self.destroy(*args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ProviderCreateView (generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = Provider.objects.all()
    serializer_class = ProviderCreateSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)






class EmploymentDetailView(generics.GenericAPIView,
                           mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Employment.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return EmploymentWriteSerializer
        return EmploymentReadSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


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
            queryset = Employment.objects.filter(
                provider=provider, is_active=True)
            return queryset

    def get(self, request, *args, **kwargs):

        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class EmploymentStaffListView(generics.GenericAPIView,
                              mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    queryset = Employment.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return EmploymentWriteSerializer
        return EmploymentReadSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if pk:
            staffAccount = Account.objects.get(id=pk)
            queryset = Employment.objects.filter(
                staff=staffAccount.staff, is_active=True)
            return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

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

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """ensures that the previous login is ended when a new one is created"""

        try:
            last_login = self.get_object()
            last_login.end_time = timezone.now()
            last_login.save()
        except ObjectDoesNotExist:
            return self.create(request, *args, **kwargs)

        return self.create(request, *args, **kwargs)


class LoginToProviderEventView(generics.GenericAPIView,
                               mixins.RetrieveModelMixin, mixins.UpdateModelMixin):

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

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class TelephoneListView(generics.GenericAPIView, mixins.ListModelMixin,
                        mixins.CreateModelMixin):
    serializer_class = TelephoneNumberSerializer

    def get_queryset(self):

        owner = self.kwargs.get("owner_pk")
        owner_type = self.kwargs.get("owner_type")
        if owner_type == "patient":
            qs = TelephoneNumber.objects.filter(owner_patient=owner)
            return qs
        elif owner_type == "provider":
            qs = TelephoneNumber.objects.filter(owner_provider=owner)
            return qs
        elif owner_type == "staff":
            qs = TelephoneNumber.objects.filter(owner_staff=owner)
            return qs

    def get_serializer_context(self):
        context = super().get_serializer_context()
        owner_type = self.kwargs.get("owner_type")
        context["owner_type"] = owner_type
        return context

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class AddressListView(generics.GenericAPIView, mixins.ListModelMixin,
                      mixins.CreateModelMixin):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_queryset(self):
        owner = self.kwargs.get("owner_pk")
        owner_type = self.kwargs.get("owner_type")
        if owner_type == "patient":
            qs = Address.objects.filter(patient=owner)
            return qs
        elif owner_type == "provider":
            qs = Address.objects.filter(provider=owner)
            return qs
        # elif owner_type == "staff":
        #   qs = Address.objects.filter(staff=owner)
        #   return qs

    def get_serializer_context(self):
        context = super().get_serializer_context()
        owner_type = self.kwargs.get("owner_type")
        context["owner_type"] = owner_type
        return context

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class AddressDetailView(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                        mixins.RetrieveModelMixin, mixins.CreateModelMixin,):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TelephoneDetailView(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                          mixins.RetrieveModelMixin, mixins.CreateModelMixin,):
    queryset = TelephoneNumber.objects.all()
    serializer_class = TelephoneNumberSerializer

    # def get_object(self):
    #     print(self.kwargs.get("pk"))
    #     print("gsodhaaaa#############################################################################")
    #     return super().get_object()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    # def put(self, request, *args, **kwargs):
    #     return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class SearchPatientView(generics.GenericAPIView, mixins.RetrieveModelMixin,
                        mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin
                        ):

    serializer_class = PatientProfileSerializer

    lookup_field = "email"
    lookup_url_kwarg = "email"

    def get_queryset(self):

        q_params = self.request.query_params

        lookups = Q()

        first_name = q_params.get("firstName", None)
        if first_name:
            q_obj = Q(first_name__icontains=first_name)
            lookups &= q_obj

        middle_names = q_params.get("middleNames", None)
        if middle_names:
            q_obj = Q(middle_names__icontains=middle_names)
            lookups &= q_obj

        last_name = q_params.get("lastName", None)
        if last_name:
            q_obj = Q(last_name__icontains=last_name)
            lookups &= q_obj

        date_of_birth = q_params.get("dateOfBirth", None)
        if date_of_birth:
            q_obj = Q(date_of_birth__exact=date_of_birth)
            lookups |= q_obj

        email = q_params.get("email", None)
        if email and email != "":
            q_obj = Q(account__email__exact=email)
            lookups &= q_obj

        telephone_number = q_params.get("telephoneNumber", None)
        if telephone_number and telephone_number != "":
            q_obj = Q(phone_nums__telephone_number__exact=telephone_number)
            lookups &= q_obj
        qs = Patient.objects.filter(lookups).distinct()

        provider = q_params.get("provider", None)
        if provider:
            return qs.filter(provider__id=provider)

        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class TestView(generics.GenericAPIView, mixins.RetrieveModelMixin,
               mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin
               ):
    # queryset= Address.objects.all()
    serializer_class = PatientProfileSerializer

    lookup_field = "email"
    lookup_url_kwarg = "email"
    # pagination_class = DEFAULT_PAGINATION_CLASS

    def get_queryset(self):

        q_params = self.request.query_params

        lookups = Q()

        first_name = q_params.get("firstName", None)
        if first_name:
            q_obj = Q(first_name__icontains=first_name)
            lookups &= q_obj

        middle_names = q_params.get("middleNames", None)
        if middle_names:
            q_obj = Q(middle_names__icontains=middle_names)
            lookups &= q_obj

        last_name = q_params.get("lastName", None)
        if last_name:
            q_obj = Q(last_name__icontains=last_name)
            lookups &= q_obj

        date_of_birth = q_params.get("dateOfBirth", None)
        if date_of_birth:
            q_obj = Q(date_of_birth__exact=date_of_birth)
            lookups |= q_obj

        email = q_params.get("email", None)
        if email and email != "":
            q_obj = Q(account__email__exact=email)
            lookups &= q_obj

        telephone_number = q_params.get("telephoneNumber", None)
        if telephone_number and telephone_number != "":
            q_obj = Q(phone_nums__telephone_number__exact=telephone_number)
            lookups &= q_obj
        qs = Patient.objects.filter(lookups).distinct()

        provider = q_params.get("provider", None)
        if provider:
            return qs.filter(provider__id=1)

        return qs

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
