from dataclasses import field
from rest_framework import serializers
from . import utils
from django.utils.translation import gettext_lazy as _
from users.models import Patient, Staff
from .models import *



class PatientIcdCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientIcdCode
        fields = "__all__"
        extra_kwargs = {'recorded_by': {'required': False},
        }

    # recorded_by = models.ForeignKey(Staff, on_delete= models.DO_NOTHING)
    # patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    # date_recorded = models.DateField(auto_now_add=True)
    

    # code= models.CharField(max_length=20)
    # title = models.CharField(max_length=200)
    # selectedText = models.CharField(max_length=200)
    # linearizationUri = models.CharField(max_length=200)
    # foundationUri = models.CharField(max_length=200)



class RecordFileSerializer(serializers.ModelSerializer):
    uploading_staff_name = serializers.SlugRelatedField(source="uploaded_by",read_only= True,slug_field="get_name")
    class Meta:
        model = RecordFile
        fields = ["id","file", "file_name","date_uploaded","patient", "uploaded_by", "uploading_staff_name" ]
        extra_kwargs = {'uploaded_by': {'required': False},
        }
    def create(self, validated_data):
        user = self.context["request"].user
        print(user)
        return RecordFile.objects.create(uploaded_by=user,**validated_data )
class PastConditionsSerializer(serializers.ModelSerializer):
    # recorded_by = serializers.SlugRelatedField(slug_field="is_staff", read_only=True)
    class Meta:
        model = PastConditions
        fields = "__all__"
        extra_kwargs = {'recorded_by': {'required': False},
        }
    def create(self, validated_data):
        user = self.context["request"].user
        return PastConditions.objects.create(recorded_by = user, **validated_data)



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
        print(validated_data)
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