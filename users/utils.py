from .models import Account, Patient, Staff, TelephoneNumber, Address
from django.core.exceptions import ObjectDoesNotExist


# create a patient

def create_staff(email, password, **kwargs):
    professional_number = kwargs["professional_number"]
    staff_role = "DR"
    first_name = kwargs.get("first_name")
    middle_names = kwargs.get("middle_names")
    last_name = kwargs.get("last_name")
    title = kwargs.get("title")
    telephone_num = kwargs.get("telephone_number")

    try:
        staff_account = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        staff_account = Account.objects.create_user(email=email, password=password)

    staff = Staff(professional_number=professional_number, staff_role=staff_role,
                  first_name=first_name, last_name=last_name, middle_names=middle_names, title=title,
                  account=staff_account)
    staff.save()
    TelephoneNumber.objects.create(telephone_number=telephone_num, staff=staff)

    return staff


def create_patient_profile(**kwargs):
    first_name = kwargs.get("first_name")
    middle_names = kwargs.get("middle_names")
    last_name = kwargs.get("last_name")
    title = kwargs.get("title")
    date_of_birth = kwargs.get("date_of_birth")
    telephone_num = kwargs.get("telephone_number")

    unit_number = kwargs.get("unit_number")
    first_line = kwargs.get("first_line")
    second_line = kwargs.get("second_line")
    city = kwargs.get("city")
    governorate = kwargs.get("governorate")

    try:
        patient = Patient.objects.get(first_name=first_name, middle_names=middle_names, last_name=last_name,
                                      date_of_birth=date_of_birth)
    except ObjectDoesNotExist:
        patient = Patient.objects.create(first_name=first_name, last_name=last_name, middle_names=middle_names,
                                         title=title, date_of_birth=date_of_birth)

    TelephoneNumber.objects.create(telephone_number=telephone_num, patient=patient)
    Address.objects.create(unit_number=unit_number, first_line=first_line, second_line=second_line, city=city,
                           governorate=governorate, patient=patient)

    patient.save()
    return patient


def create_patient_account(email, password, **kwargs):
    try:
        patient_account = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        patient_account = Account.objects.create_user(email=email, password=password)

    patient = create_patient_profile(**kwargs)
    patient.account = patient_account
    patient.save()

    return patient
