from .models import RepeatMedication
from users.models import Patient

from django.shortcuts import get_object_or_404

def patient_add_medication(patient_id, **kwargs ):
    patient = get_object_or_404(Patient, pk=patient_id)
    medication = RepeatMedication.objects.create(patient = patient, **kwargs)
    return medication


def get_patient_mediations(patient_id):
    # patient = get_object_or_404(Patient, pk=patient_id)
    repeat_meds = RepeatMedication.objects.filter(patient = patient_id)
    return repeat_meds