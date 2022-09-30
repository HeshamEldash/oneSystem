from pyexpat import model
from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import Account, Patient, Staff
import datetime
from django.utils import timezone 

class Record(models.Model):
    date_created= models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    patient=models.ForeignKey(Patient, on_delete= models.CASCADE)
    history= models.TextField(null=True, blank=True)
    examination= models.TextField(null=True, blank=True)
    diagnosis= models.TextField(null=True, blank=True)
    managment_plan = models.TextField(null=True, blank=True)
    is_public = models.BooleanField(default=True)



class RecordUpdateEvent(models.Model):
    record = models.ForeignKey(Record, on_delete=models.DO_NOTHING)

    staff = models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    datetime_of_update = models.DateTimeField(auto_now_add=True)
    
    prev_history= models.TextField(null=True, blank=True)
    prev_examination= models.TextField(null=True, blank=True)
    prev_diagnosis= models.TextField(null=True, blank=True)
    prev_managment_plan = models.TextField(null=True, blank=True)
    prev_is_public = models.BooleanField(blank=True)
    
    new_history= models.TextField(null=True, blank=True)
    new_examination= models.TextField(null=True, blank=True)
    new_diagnosis= models.TextField(null=True, blank=True)
    new_managment_plan = models.TextField(null=True, blank=True)
    new_is_public = models.BooleanField(blank=True)
    


class Note(models.Model):
    date_created= models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    patient=models.ForeignKey(Patient, on_delete= models.CASCADE)
    note= models.TextField(null=True, blank=True)
    is_public = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("note")
        verbose_name_plural = _("note")


class ViewedRecordEvent(models.Model):
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(blank=True, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.DO_NOTHING) 
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING) 


    @property
    def duration(self):
        if not (self.start_date and self.end_date): 
            return None
        duration = self.start_date - self.end_date 

        return duration


class PastConditions(models.Model):
    date_diagnosed = models.DateField(default=timezone.now().date(), blank=True)
    condition = models.CharField(max_length=600)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    recorded_by = models.ForeignKey(Account, on_delete= models.DO_NOTHING)
    icd_code = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.condition


class PatientIcdCode(models.Model):
    recorded_by = models.ForeignKey(Staff, on_delete= models.DO_NOTHING)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date_recorded = models.DateField(auto_now_add=True)
    code= models.CharField(max_length=20)
    selectedText = models.CharField(max_length=200)
    linearizationUri = models.CharField(max_length=200)
    foundationUri = models.CharField(max_length=200)

    def __str__(self):
        return self.selectedText +" " + self.code

