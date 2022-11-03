from .models import * 





def create_prescription(validated_data,prescriber, **kwargs):
    medications = kwargs.pop("medications", None)
    validated_data.pop("medications")
    # validated_data.pop("prescriber")

    px_obj = Prescription.objects.create(prescriber = prescriber, **validated_data)

    medication_objects = []
    for medication in medications:
        print(medication)
        med = PrescribedMedication.objects.create(**medication)
        print(med)
        medication_objects.append(med)

    print(medication_objects)
    px_obj.medications.set(medication_objects)

    return px_obj
     





