from enum import unique
from unittest.util import _MAX_LENGTH
from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import Account, Patient, Staff, Provider



class Medication(models.Model):
    name = models.CharField(_("name"),max_length=500, unique=False, null=False)
    rxcui =models.CharField(max_length=20, unique=False, null=True, blank=True)
    
    class Meta:
        abstract= True
     

class PrescribedMedication(Medication):
    dose = models.CharField(_("dose"),max_length=500, unique=False, null=False)
    is_regular = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name


class Prescription(models.Model):
    medications = models.ManyToManyField(PrescribedMedication)
    date_created= models.DateTimeField(auto_now_add=True)
    prescriber = models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    patient=models.ForeignKey(Patient, on_delete= models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)

class RepeatMedication(Medication):
    date_created= models.DateField(auto_now_add=True)
    patient=models.ForeignKey(Patient, on_delete= models.CASCADE)
    dose = models.CharField(_("dose"),max_length=500, unique=False, null=False)

    def __str__(self):
        return self.name


class PrescriptionTemplate():
    pass 

class UserMedicationPreset(models.Model):
    staff = models.ForeignKey(Staff,on_delete=models.CASCADE)
    medication = models.ForeignKey(PrescribedMedication,on_delete=models.CASCADE)

    def __str__(self):
        return self.medication.name


