from .models import Account, Patient, Staff, TelephoneNumber, Address, Provider
from django.core.exceptions import ObjectDoesNotExist

#Final
def create_staff(email, password, **kwargs):
    """
    Ensures that a staff accout and profile are created together
    Should be user with staff account serializer to create an account and profile 
    
    """
    telephone_num = kwargs["staff"].pop("phone_nums")

    try:
        staff_account = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        staff_account = Account.objects.create_user(email=email, password=password)

    staff = Staff(account=staff_account, **kwargs["staff"])
    staff.save()

    TelephoneNumber.objects.create(telephone_number=telephone_num, owner_staff=staff)

    return staff_account

#Final
def create_patient_profile(**kwargs):
    """
    A patient profile is created by a staff member rather than registered by the patient. 

    creates a patient profile. If the profile already exists can add address and telephone number to it
    this ensures when creating a pteaint profile that a Telephone and address model are created at the same time 
    Also this ensures that the patient profile doesn't get duplicated.
    """
    phone_nums= kwargs.pop("phone_nums")
    address = kwargs.pop("address_set")
    try:
        patient = Patient.objects.get(**kwargs)

    except ObjectDoesNotExist:
        patient = Patient.objects.create(**kwargs)

    if phone_nums:
        for num in phone_nums:
            TelephoneNumber.objects.create(
                owner_patient=patient,
                **num
            )

    if address:
        for ad in address:
            Address.objects.create(patient=patient, **ad)

    patient.save()
    return patient

#Final
def create_patient_account(email, password, **kwargs):
    """
    This function should be used to allow a user to register an account and create a patient profile at the same time. 
    Should be used with patient account serializer. 

    The function takes the email and password. if the account is already in the DB, that account will be retrieved and
    the patient profile will be attached to it.
    """
    try:
        patient_account = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        patient_account = Account.objects.create_user(email=email, password=password)
    
    patient = create_patient_profile(**kwargs["patient"])
    patient.account = patient_account
    patient.save()

    return patient_account


def create_update_provider(email, **kwargs):
    name = kwargs.get("name")

    telephone_num = kwargs.get("telephone_number")

    unit_number = kwargs.get("unit_number")
    first_line = kwargs.get("first_line")
    second_line = kwargs.get("second_line")
    city = kwargs.get("city")
    governorate = kwargs.get("governorate")

    try:
        owner = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        raise ObjectDoesNotExist

    try:
        provider = Provider.objects.get(name=name)
    except ObjectDoesNotExist:
        provider = Provider.objects.create(name=name, owner=owner)

    TelephoneNumber.objects.create(telephone_number=telephone_num, provider=provider)
    Address.objects.create(unit_number=unit_number, first_line=first_line, second_line=second_line, city=city,
                           governorate=governorate, provider=provider)

    provider.save()

    return provider
