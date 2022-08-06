from audioop import add
from .models import Account, Patient, Staff, TelephoneNumber, Address, Provider
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings 
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
#FInal
def update_staff(instance, **kwargs ):
    """
    Updates the staff profile. 
    Used with StaffSerializer 
    Desgined to be accessed by a user to update a profile 
    """
    phone_nums= kwargs.pop("phone_nums")
    instance.first_name = kwargs.get('first_name', instance.first_name)
    instance.middle_names = kwargs.get('middle_names', instance.middle_names)
    instance.last_name = kwargs.get('last_name', instance.last_name)
    instance.staff_role = kwargs.get('staff_role', instance.staff_role)
    instance.professional_number = kwargs.get('professional_number', instance.professional_number)

    # This code will do 3 things:
    # 1) Gets all previous instance (staff) numbers 
    # 2) Loops through the incoming numbers, will either get it or 
    #     if not in the DB will create it then adds to a list called new_nums
    # 3) Compares the old & the new lists, if the number is in the old and not the new
    #     it gets deleted
    old_nums = instance.phone_nums.all()
    new_nums = []
    for num in phone_nums:
        try:
            obj = TelephoneNumber.objects.get(
                owner_staff = instance, 
                telephone_number = num["telephone_number"]
            )
        except:
            obj = TelephoneNumber.objects.create(
                owner_staff = instance, 
                telephone_number = num["telephone_number"]
            )
        new_nums.append(obj)

    
    for num_obj in old_nums:
        if num_obj not in new_nums:
            num_obj.delete() 

    instance.save()
    return instance

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
        Address.objects.create(patient=patient, **address)

    patient.save()
    return patient

# Final
def update_patient_profile(instance, **kwargs):
    """
    Updates the profile of the patient 
    will create new phone numbers if needed 
    Will update the patient address if changed
    """

    phone_nums= kwargs.pop("phone_nums")
    address = kwargs.pop("address")
    instance.first_name = kwargs.get('first_name', instance.first_name)
    instance.middle_names = kwargs.get('middle_names', instance.middle_names)
    instance.last_name = kwargs.get('last_name', instance.last_name)
    instance.date_of_birth = kwargs.get('date_of_birth', instance.date_of_birth)
  
    # This code will do 3 things:
    # 1) Gets all previous instance (patient) numbers 
    # 2) Loops through the incoming numbers, will either get it or 
    #     if not in the DB will create it then adds to a list called new_nums
    # 3) Compares the old & the new lists, if the number is in the old and not the new
    #     it gets deleted
    old_nums = instance.phone_nums.all()
    new_nums = []
    for num in phone_nums:
        try:
            obj = TelephoneNumber.objects.get(
                owner_patient = instance, 
                telephone_number = num["telephone_number"]
            )
        except:
            obj = TelephoneNumber.objects.create(
                owner_patient = instance, 
                telephone_number = num["telephone_number"]
            )
        new_nums.append(obj)

    for num_obj in old_nums:
        if num_obj not in new_nums:
            num_obj.delete() 

    # to update the address
    instance.address.unit_number = address["unit_number"]
    instance.address.first_line = address["first_line"]
    instance.address.second_line = address["second_line"]
    instance.address.city = address["city"]
    instance.address.governorate = address["governorate"]

    instance.address.save()
    instance.save()
    return instance

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

#To finalise will need to confirm email is being 
#passed from the request user 
#also needs to deicde what happens with the update
def create_update_provider(email, **kwargs):
    """
    Takes the email from the request user and finds that account. 
    It then creates a Provider profile and assigns it to that account. 
    """
    name = kwargs.get("name")
    telephone_nums = kwargs.pop("phone_nums")
    address = kwargs.pop("address_set")

    try:
        owner = Account.objects.get(email=email)
    except ObjectDoesNotExist:
        raise ObjectDoesNotExist

    try:
        provider = Provider.objects.get(name=name)
    except ObjectDoesNotExist:
        provider = Provider.objects.create(name=name, owner=owner)


    if telephone_nums:
        for num in telephone_nums:
            TelephoneNumber.objects.create(telephone_number=num, provider=provider)
    if address:  
        for ad in address:   
            Address.objects.create(provider=provider, **ad)

    provider.save()

    return provider

def create_registration():
    pass 
