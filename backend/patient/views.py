
from django.utils.translation import gettext_lazy as _

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, mixins, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.models import Patient
from error_handler.api_error_handler import ApiErrorsMixin
from .serializers import PatientProfileDetailSerializer
from .services import PatinetService


class PatientAccountCreateView(ApiErrorsMixin, APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]
    
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
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    
    
    def get(self, request, *args, **kwargs):
        print(request.user)
        print(self.request.query_params)
        account_pk = self.request.query_params.get("patient_id")
        print(account_pk)
        patient = PatinetService().get_profile(account_pk)
        return Response(status=status.HTTP_200_OK, data=PatientProfileDetailSerializer(patient).data)
        
        
    