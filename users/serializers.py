from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["is_staff"] = user.is_staff
        token["email"] = user.email
        token["professional_number"] = user.professional_number
        token["staff_role"] = user.staff_role
        return token


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ["email", "title", "first_name", "middle_names", "last_name", "date_of_birth",
                  "date_joined", "last_login", "is_active"]


    def create(self, validated_data):
        return Patient.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.email= validated_data.get("email", instance.email)
        instance.title= validated_data.get("title", instance.title)
        instance.first_name= validated_data.get("first_name", instance.first_name)
        instance.middle_names= validated_data.get("middle_names", instance.middle_names)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.date_of_birth= validated_data.get("date_of_birth", instance.date_of_birth)
        instance.date_joined= validated_data.get("date_joined", instance.date_joined)