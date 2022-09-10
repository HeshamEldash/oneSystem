from django.contrib import admin
from .models import Note, Record, RecordUpdateEvent
# Register your models here.




admin.site.register(Note)
admin.site.register(RecordUpdateEvent)


admin.site.register(Record)