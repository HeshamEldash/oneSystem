from rest_framework import serializers
from . import utils
from django.utils.translation import gettext_lazy as _
from users.models import Patient, Staff
from .models import *



class RecordSerializer(serializers.ModelSerializer):
    date_created  = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only = True)
    author_name =  serializers.CharField(source="author" ,read_only=True)

    class Meta:
        model = Record
        fields = "__all__"
        extra_kwargs = {'author': {'required': False},
            "patient": {"read_only":False}
        }


    def create(self, validated_data):
        req_user = self.context["request"].user
        record=  Record.objects.create(
         author =  req_user.staff,
         **validated_data
        )
        return record

    def update(self, instance, validated_data):

        req_user = self.context["request"].user
        
        records= RecordUpdateEvent.objects.create(
            record=instance,
            staff = req_user.staff,
            prev_history= instance.history,
            prev_examination=instance.examination,
            prev_diagnosis= instance.diagnosis,
            prev_managment_plan=instance.managment_plan,
            prev_is_public= instance.is_public,
            new_history= validated_data["history"],
            new_examination=validated_data["examination"],
            new_diagnosis=validated_data["diagnosis"],
            new_managment_plan=validated_data["managment_plan"],
            new_is_public=validated_data["is_public"],
        )

        return super().update(instance, validated_data)