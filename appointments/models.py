from django.db import models
from users.models import Account, Patient, Staff, Provider
from django.utils.translation import gettext_lazy as _
import datetime

class Clinic(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    speciality = models.CharField(max_length=1000, blank=True, null=True )
    clinican = models.ForeignKey(Staff, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.clinican} {_('Clinic')}"


class SessionManager(models.Manager):

    def create(self,start,end, clinic, slots_data=[],  **kwargs):

        session = Session(
            start = start,
            end = end,
            clinic = clinic,
        )
        session.save()

        for slot in slots_data:
            slot_obj = Slot(
             planned_start= slot.planned_start,
               slot_duration= slot.duration,
                session = session,
            )  
        
            slot_obj.save() 
            

    def create_with_slots(self,start,end,clinic, slot_duration,  **kwargs):
        """ takes in 
            clinic: clinic object
            start: a datetime, end: a datetime ,
            slot_duration: an integer that would represnt minutes 
        """
        session = Session(
            start = start,
            end = end,
            clinic = clinic,
        )

        session.save()

        number_of_slots = session.number_of_slots(slot_duration=slot_duration)

        start_time = session.start
        for slot in range(number_of_slots):
            slot_obj = Slot(
                planned_start =  start_time.strftime('%H:%M:%S'),
                slot_duration = datetime.timedelta(minutes=slot_duration),
                session = session,
            )  
        
            slot_obj.save() 
            start_time += datetime.timedelta(minutes=slot_duration)

        return session
            


class Session(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)

    objects = SessionManager()

    def __str__(self):
        return f"{self.clinic}'s {self.date} session"


    @property
    def duration(self):
        if not (self.start_date and self.end_date): 
            return None
        duration = self.start_date - self.end_date 

        return duration

    @property
    def start_time(self):
       return  self.start.time()
    @property
    def end_time(self):
       return  self.end.time()
    @property
    def session_date(self):
        return self.start.date()

    @property
    def clinician(self):
        return self.clinic.clinican.full_name
    

    def number_of_slots(self, slot_duration):
        print (self.end - self.start)
        session_duration = self.end - self.start
        # session_duration = datetime.datetime.combine(self.date, self.end_time) - datetime.datetime.combine(self.date, self.start_time)

        session_duration_mins = session_duration.total_seconds()/60
        number_of_slots = round(session_duration_mins / slot_duration)

        return number_of_slots

    def check_slots(self):
        total = None
        for slot in self.slot_set:
            total += slot.duration

        if total > self.duration:
            return "Erorr, there is no space for more slots. You have to reduce the duration of slots or increase duration of the session"
        

class Slot(models.Model):
    planned_start = models.TimeField()
    slot_duration = models.DurationField()
    session= models.ForeignKey(Session, on_delete=models.CASCADE)

    @property
    def planned_end(self):
        if not (self.start_date and self.slot_duration): 
            return None
        planned_end = self.planned_start + self.planned_end

        return planned_end



class SessionPreset(models.Model):
    name = models.CharField(max_length = 1000)
    session = models.ForeignKey(Session, on_delete= models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete= models.CASCADE)

    def __str__(self):
        return self.name


        
class Appointment(models.Model):
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)
    actual_start = models.TimeField(blank=True, null=True)
    actual_end= models.TimeField(blank=True, null=True)

    patient =  models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    clincian =  models.ForeignKey(Staff, on_delete=models.DO_NOTHING)

    presentation = models.CharField(max_length=1000, blank=True, null=True)
