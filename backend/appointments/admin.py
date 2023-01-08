from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Slot)
admin.site.register(Clinic)
admin.site.register(Session)
admin.site.register(Appointment)