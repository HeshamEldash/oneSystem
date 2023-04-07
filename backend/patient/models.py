from django.db import models
from users.models import Patient


# Create your models here.







class BloodPressure(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    systolic = models.CharField(max_length=3, null=False)
    diastolic = models.CharField(max_length=3, null=True)
    date_recorded = models.DateTimeField(auto_now_add=True)


class BloodSugar(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    blood_sugar = models.IntegerField()
    date_recorded = models.DateTimeField(auto_now_add=True)
    
    
     

class Weight(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    weight = models.IntegerField()
    date_recorded = models.DateField(auto_now_add=True)
    
    
     

class Height(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    height = models.IntegerField()
    date_recorded = models.DateField(auto_now_add=True)
    
    
    