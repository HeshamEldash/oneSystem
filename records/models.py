from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import Patient, Staff
# Create your models here.

class Record(models.Model):
    date_created= models.DateTimeField(auto_now_add=True)
    author=models.OneToOneField(Staff, on_delete=models.DO_NOTHING)
    patient=models.OneToOneField(Patient, on_delete= models.CASCADE)
    history= models.TextField(null=True, blank=True)
    examination= models.TextField(null=True, blank=True)
    diagnosis= models.TextField(null=True, blank=True)
    managment_plan = models.TextField(null=True, blank=True)
    is_public = models.BooleanField(default=True)


class Note(models.Model):
    date_created= models.DateTimeField(auto_now_add=True)
    author=models.OneToOneField(Staff, on_delete=models.DO_NOTHING)
    patient=models.OneToOneField(Patient, on_delete= models.CASCADE)
    note= models.TextField(null=True, blank=True)
    is_public = models.BooleanField(default=True)


    class Meta:
        verbose_name = _("note")
        verbose_name_plural = _("note")