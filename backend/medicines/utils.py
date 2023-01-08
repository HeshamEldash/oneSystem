from .models import * 





def create_prescription(validated_data,prescriber, **kwargs):
    medications = kwargs.pop("medications", None)
    validated_data.pop("medications")
    # validated_data.pop("prescriber")

    px_obj = Prescription.objects.create(prescriber = prescriber, **validated_data)

    medication_objects = []
    for medication in medications:
        # medication.
        # medication_id = medication.get("id", None)
        # if medication_id:
        #     print(medication)
        #     med =  PrescribedMedication.objects.get(id=medication_id)     
        #     medication_objects.append(med)

        # else:     
        #     med = PrescribedMedication.objects.create(**medication)
        #     print(med)
        #     medication_objects.append(med)
        is_regular = medication.get("is_regular")
        dose= medication.get("dose")
        rxcui= medication.get("rxcui")
        name= medication.get("name")
  
        med = PrescribedMedication.objects.create(
          name=name,
           dose=dose, 
           rxcui=rxcui,
           is_regular=is_regular
        )
        medication_objects.append(med)
        print(med.is_regular)
    px_obj.medications.set(medication_objects)

    return px_obj
     





