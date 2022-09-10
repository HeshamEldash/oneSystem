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
        extra_kwargs = {'author': {'required': False}}


    def create(self, validated_data):
        print (validated_data)
        # validated_data.pop("author")
        # patient_id = validated_data.pop("patient")


        req_user = self.context["request"].user
        print (req_user.staff)
        record=  Record.objects.create(
            # author = Staff.objects.get(pk=1),
         author =  req_user.staff,
         **validated_data
        )
        return record

    def update(self, instance, validated_data):
        self.Meta.extra_kwargs= {
            "author": {"read_only":True},
            "patient": {"read_only":True}
        }
        # add the updaterecord Event so when the record is updated, a trail is created 
        req_user = self.context["request"].user
        
        print (validated_data["history"])

        records= RecordUpdateEvent.objects.create(
            record=instance,
            staff = req_user.staff,
            # staff = Staff.objects.get(pk=1),

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