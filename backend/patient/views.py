
from django.utils.translation import gettext_lazy as _

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, mixins, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.models import Patient
from error_handler.api_error_handler import ApiErrorsMixin
from .serializers import PatientProfileDetailSerializer, WeightSerializer, BloodPressureSerializer
from .services import PatinetService, ProfileService


class PatientAccountCreateView(ApiErrorsMixin, APIView):


    class InputSerializer(serializers.Serializer):

        email = serializers.EmailField()
        password = serializers.CharField(
            write_only=True, style={'input_type': 'password'})

    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        PatinetService().create_account(**serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class PatinetProfileCreateView(ApiErrorsMixin, APIView):

    
    class InputSerializer(serializers.Serializer):
        MALE = "MALE"
        FEMALE = "FEMALE"

        GENDER_CHOICES = (
            (MALE, _('Male')),
            (FEMALE, _('Female'))
        )
        first_name = serializers.CharField()
        middle_names = serializers.CharField(required=False, allow_blank=True)
        last_name = serializers.CharField()
        gender = serializers.ChoiceField(choices=GENDER_CHOICES)
        date_of_birth = serializers.DateField()
        telephone_number = serializers.CharField()

    def post(self, request, *args, **kwargs):

        account_pk = self.request.query_params.get("patient_id")
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = PatinetService().create_profile(account_pk=account_pk , **serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=PatientProfileDetailSerializer(patient).data)
    
    
class PatientProfileGetView(ApiErrorsMixin, APIView):

    
    
    def get(self, request, *args, **kwargs):
        account_pk = self.request.query_params.get("patient_id")
        patient = PatinetService().get_profile(account_pk)
        return Response(status=status.HTTP_200_OK, data=PatientProfileDetailSerializer(patient).data)
        
        
class WeightCreateView(ApiErrorsMixin, APIView):

    def post(self,request):
        pateint_pk =  self.request.query_params.get("patient_id")
        serializer = WeightSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        weight = ProfileService.create_weight(pateint_pk, **serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=WeightSerializer(weight).data)
    
class WeightGetListView(ApiErrorsMixin, APIView):
    
    def get(self,request):
        pateint_pk =  self.request.query_params.get("patient_id")
        weights = ProfileService.get_weight_list(pateint_pk)
        return Response(status=status.HTTP_200_OK, data=WeightSerializer(weights, many=True).data)
        
        
class BloodPressureCreateView(ApiErrorsMixin, APIView):
    def post(self,request):
        pateint_pk =  self.request.query_params.get("patient_id")
        serializer = BloodPressureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        blood_pressure = ProfileService.create_blood_pressure(pateint_pk, **serializer.validated_data)
        return Response(status=status.HTTP_200_OK, data=BloodPressureSerializer(blood_pressure).data)
    
class BloodPressureGetListView(ApiErrorsMixin, APIView):
    def get(self,request):
        pateint_pk =  self.request.query_params.get("patient_id")
        bp_readings = ProfileService.get_bp_readings(pateint_pk)
        return Response(status=status.HTTP_200_OK, data=BloodPressureSerializer(bp_readings, many=True).data)
        