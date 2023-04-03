from .models import *
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied, ValidationError
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db import IntegrityError
from django.apps import apps


# def get_address_list(owner_id:int, owner_type:str):

#     OWNER_LIST_OPTIONS = ["provider", "branch", "staff", "patient"]


#     assert owner_type in OWNER_LIST_OPTIONS , ("you have not provided the correct owner type")
#     assert owner_id is not None,("you should provider an owner id")
#     if owner_type == "patient":
#         qs = Address.objects.filter(patient=owner_id)
#         return qs
#     elif owner_type == "provider":
#         qs = Address.objects.filter(provider=owner_id)
#         return qs
#     elif owner_type == "branch":
#         qs = Address.objects.filter(branch=owner_id)
#         return qs
#     elif owner_type == "staff":
#         qs = Address.objects.filter(staff=owner_id)
#         return qs

# def address_create(unit_number: str, first_line: str, second_line: str, city: str, governorate: str,):
#     address_obj = Address.objects.create(
#         unit_number=unit_number,
#         first_line=first_line,
#         second_line=second_line,
#         city=city,
#         governorate=governorate
#     )
#     return address_obj

def address_update(instance, **kwargs):
    instance.unit_number = kwargs.get('unit_number', instance.unit_number)
    instance.first_line = kwargs.get('first_line', instance.first_line)
    instance.second_line = kwargs.get('second_line', instance.second_line)
    instance.city = kwargs.get('city', instance.city)
    instance.governorate = kwargs.get('governorate', instance.governorate)

    instance.save()
    return instance


# def telephone_create(telephone_number: str,):

#     telephone_obj = TelephoneNumber.objects.create(telephone_number=telephone_number )

#     return telephone_obj

def get_phone_model(owner_type: str):
    VALID_MODELS = ["patient", "staff", "branch", "provider"]
    assert owner_type in VALID_MODELS, (
        'The model provided is not a valid model, it has to be either "patient","staff" ,"branch", or "provider" ')
    phone_model = apps.get_model(
        "users", f"{owner_type.title()}TelephoneNumbers")

    return phone_model


def update_telephone_number(owner_type: str, telephone_id: str, **kwargs):
    phone_model = get_phone_model(owner_type)
    instance = get_object_or_404(phone_model, pk=telephone_id)
    instance.telephone_number = kwargs.get(
        'telephone_number', instance.telephone_number)
    instance.save()
    return instance


def add_telephone_number(owner_id: str, owner_type: str, telephone_number: str):

    owner_model = apps.get_model("users", owner_type.title())

    owner_instance = get_object_or_404(owner_model, pk=owner_id)

    phone_model = get_phone_model(owner_type)

    new_num = phone_model.objects.create(
        telephone_number=telephone_number,
        owner=owner_instance
    )
    return new_num


def branch_list_get(provider_pk: int):
    provider = Provider.objects.get(pk=provider_pk)
    obj_set = provider.branch_set.all()

    return obj_set


def branch_create(provider: Provider, branch_name: str, unit_number: str,
                  first_line: str, second_line, city: str, governorate: str, telephone_number: str,):

    branch = Branch.objects.create(
        branch_name=branch_name,
        provider=provider
    )
    BranchAddress.objects.create(unit_number=unit_number, first_line=first_line,
                                 second_line=second_line, city=city, governorate=governorate, branch=branch
                                 )

    BranchTelephoneNumbers.objects.create(
        telephone_number=telephone_number,
        owner=branch
    )
    branch.save()

    return branch


def branch_update(instance, **kwargs):
    instance.branch_name = kwargs.get('branch_name', instance.branch_name)

    instance.save()
    return instance


class BranchService:

    @staticmethod
    def create(provider: Provider, branch_name: str, unit_number: str,
               first_line: str, second_line, city: str, governorate: str, telephone_number: str
               ):

        branch = Branch.objects.create(
            branch_name=branch_name,
            provider=provider
        )

        BranchAddress.objects.create(unit_number=unit_number, first_line=first_line,
                                     second_line=second_line, city=city, governorate=governorate, branch=branch
                                     )

        BranchTelephoneNumbers.objects.create(
            telephone_number=telephone_number,
            owner=branch
        )

        branch.save()

        return branch

    # @staticmethod
    def update_telephone_numbers(self, instance, **kwargs):
        telephone_numbers = kwargs.pop("telephone_numbers", None)
        print(telephone_numbers)
        
        old_nums = instance.branchtelephonenumbers_set.all()
        new_nums = []
        
        if telephone_numbers:
            for num in telephone_numbers:
                try:
                    obj = BranchTelephoneNumbers.objects.get(
                        owner=instance,
                        telephone_number=num
                    )
                except:
                    obj = BranchTelephoneNumbers.objects.create(
                        owner=instance,
                        telephone_number=num
                    )
                new_nums.append(obj)

            for num_obj in old_nums:
                if num_obj not in new_nums:
                    num_obj.delete()

        instance.branchtelephonenumbers_set.set(new_nums)
        
        instance.save()
        return instance
        
    def update(self, instance, **kwargs):
        instance.branch_name = kwargs.get('branch_name', instance.branch_name)
        


        address = kwargs.pop("branchaddress", None)
        
        if address:
            instance.branchaddress.unit_number = address["unit_number"]
            instance.branchaddress.first_line = address["first_line"]
            instance.branchaddress.second_line = address["second_line"]
            instance.branchaddress.city = address["city"]
            instance.branchaddress.governorate = address["governorate"]
            instance.branchaddress.save()
        instance.save()
        return instance

    @staticmethod
    def branch_list_get(provider_pk: int):
        provider = Provider.objects.get(pk=provider_pk)
        obj_set = provider.branch_set.all()

        return obj_set


def provider_create(name: str, owner: Account, branch_name: str, unit_number: str,
                    first_line: str, second_line, city: str, governorate: str, telephone_number: str,
                    ):
    provider = Provider.objects.create(
        owner=owner,
        name=name
    )
    Employment.objects.create(
            provider=provider, staff=owner.staff, employment_role="OWNER", salary=0)
    
    branch_create(provider=provider,
                  branch_name=branch_name,
                  unit_number=unit_number, first_line=first_line, second_line=second_line, city=city, governorate=governorate,
                  telephone_number=telephone_number
                  )
    

    
    
    return provider


def provider_update(instance, **kwargs):

    instance.name = kwargs.get('name', instance.name)
    instance.owner = kwargs.get('owner', instance.owner)

    instance.save()

    return instance


def get_provider_registration_list(provider_pk: int):

    provider_obj = get_object_or_404(Provider, pk=provider_pk)
    regsitration_list = provider_obj.registration_set.all()
    return regsitration_list

def get_provider_registration_count(provider_pk: int):

    provider_obj = get_object_or_404(Provider, pk=provider_pk)
    regsitration_list_count = provider_obj.registration_set.count()
    return regsitration_list_count


def check_employment_exists(provider: Provider, staff: Staff):
    try:
        employment = provider.employment_set.get(staff=staff)
        return employment
        
    except Employment.DoesNotExist:
        return False


def check_provider_patient_relationship(provider: Provider, patient: Patient):
    try:
        Registration.objects.get(provider=provider, patient=patient)
        return True
    except Registration.DoesNotExist:
        return False


def check_patient_clinican_relationship( staff: Staff, patient: Patient, provider =  None):
    """_summary_
        checks if a relationship between a clinican and patinet exists 
        can be used to decide if a patient record should be viewed 
    Args:
        provider (Provider): Provider instance
        staff (Staff): Staff Instance
        patient (Patient): Patient Instance 

    Returns:
        a Tuple, the first argument is a boolean and a second is a description 
    """
    # TODO depending on the logic check if the provider needs to be checkd

    providers_querySet = Provider.objects.filter(
        employment__staff=staff, registration__patient=patient)

    if providers_querySet.exists():
        if provider in providers_querySet:
            return (True, "Current Provider")
        else:
            return (True, "Different Provider")

    return (False, "No realtionship ")


def check_manager_staff_relationship(staff: Staff, manager: Account):

    if not hasattr(manager, "staff"):
        return False

    staff_providers = Provider.objects.filter(employment__staff=staff)
    manager_provider = Provider.objects.filter(
        employment__staff=manager.staff, employment__employment_role="MG")

    qs = staff_providers.intersection(manager_provider)

    if qs.exists():
        return True

    return False


class StaffService:

    @staticmethod
    def staff_create(email: str, password: str, first_name: str, middle_names: str, last_name: str, professional_number: str, staff_role: str, telephone_number: str):

        try:
            staff_account = Account.objects.get(email=email)
        except ObjectDoesNotExist:
            try:
                staff_account = Account.objects.create_user(
                    email=email, password=password)
            except IntegrityError:
                raise ValidationError

            
        staff = Staff.objects.create(account=staff_account,
                                     first_name=first_name, middle_names=middle_names, last_name=last_name, staff_role=staff_role, professional_number=professional_number
                                     )

        StaffTelephoneNumbers.objects.create(
            telephone_number=telephone_number,
            owner=staff
        )

        return staff

    def update_telephone_numbers(self, instance, **kwargs):
        telephone_numbers = kwargs.pop("telephone_numbers", None)
   
        old_nums = instance.stafftelephonenumbers_set.all()
        new_nums = []
        
        if telephone_numbers:
            for num in telephone_numbers:
                try:
                    obj = StaffTelephoneNumbers.objects.get(
                        owner=instance,
                        telephone_number=num
                    )
                except:
                    obj = StaffTelephoneNumbers.objects.create(
                        owner=instance,
                        telephone_number=num
                    )
                new_nums.append(obj)

            for num_obj in old_nums:
                if num_obj not in new_nums:
                    num_obj.delete()

        instance.stafftelephonenumbers_set.set(new_nums)
        
        instance.save()
        return instance
    
    @staticmethod
    def update_staff(instance, **kwargs):
        """
        Updates the staff profile. 
        """
        instance.first_name = kwargs.get('first_name', instance.first_name)
        instance.middle_names = kwargs.get(
            'middle_names', instance.middle_names)
        instance.last_name = kwargs.get('last_name', instance.last_name)
        instance.staff_role = kwargs.get('staff_role', instance.staff_role)
        instance.professional_number = kwargs.get(
            'professional_number', instance.professional_number)

        instance.save()


def create_employment(staff: int, provider: int, salary: float, employment_role: str):
    provider = get_object_or_404(Provider, pk=provider)
    staff = get_object_or_404(Staff, pk=staff)

    try:
        emp = Employment.objects.create(
            provider=provider, staff=staff, employment_role=employment_role, salary=salary)
    except IntegrityError:
        return False
    return emp


def update_employment(instance, **kwargs):
    instance.salary = kwargs.get('salary', instance.salary)
    instance.employment_role = kwargs.get(
        'employment_role', instance.employment_role)

    instance.save()

    return instance


def get_provider_employment_list(provider_pk: int):
    provider = get_object_or_404(Provider, pk=provider_pk)
    return provider.employment_set.filter( is_active=True)


def get_staff_provider_list(staff: Staff):
    return staff.employment_set.all()


def end_employment(instance):
    """sets the employment is_active to false and the end date to now"""
    if instance.is_active == False:
        return instance

    instance.is_active = False
    instance.date_employment_end = timezone.now().date()
    instance.save()
    return instance


class PatientProviderService:

    def __init__(self, provider: Provider):
        self.provider = provider

    def check_provider_patient_relationship(self, patient: Patient):
        try:
            Registration.objects.get(provider=self.provider, patient=patient)
            return True
        except Registration.DoesNotExist:
            return False

    def get_patient_profile(self, patient_pk):
        """_summary_
            retrieves the patient profile if there is a registration between the provider and the patient

        Args:
            patient_pk (_type_): Integer

        Raises:
            PermissionDenied: if relationship exists or raises a permissiondenied

        Returns:
            _type_: a patient profile object 
        """
        patient = get_object_or_404(Patient, pk=patient_pk)

        if self.check_provider_patient_relationship(patient=patient):
            return patient
        else:
            raise PermissionDenied

    def create_patient_profile(self,
                               first_name: str, middle_names: str, last_name: str, date_of_birth: str,
                               gender: str, telephone_number: str, unit_number="", first_line="",
                               second_line="", city="", governorate=""
                               ):
        """_summary_
            checks if an object with these values exists, if not will create a new object

        Returns:
            _type_: a tuple of patient object and a boolean of created or not 
        """

        patient_obj, created = Patient.objects.get_or_create(
            first_name=first_name, middle_names=middle_names, last_name=last_name,
            date_of_birth=date_of_birth, gender=gender
        )
        if created:
            PatientTelephoneNumbers.objects.create(
                telephone_number=telephone_number, owner=patient_obj
            )
            PatientAddress.objects.create(
                unit_number=unit_number, first_line=first_line, second_line=second_line,
                city=city, governorate=governorate, patient=patient_obj
            )

        return patient_obj, created

    def create_patient_and_registration(self, **kwargs):
        """_summary_
            creates a patient registration 
            and uses the self.create_patient_profile to create a profile
        Raises:
            IntegrityError: If the profile already exists

        Returns:
            a patient profile object
        """
        patient_obj, created = self.create_patient_profile(**kwargs)
        if created:
            Registration.objects.create(
                patient=patient_obj,
                provider=self.provider
            )
            return patient_obj
        else:
            raise IntegrityError

    def update_patient(self, instance, **kwargs):
        if hasattr(instance, "account"):
            if instance.account is not None:
                raise PermissionDenied
        if not self.check_provider_patient_relationship(patient=instance):
            raise PermissionDenied
        instance.first_name = kwargs.get('first_name', instance.first_name)
        instance.middle_names = kwargs.get(
            'middle_names', instance.middle_names)
        instance.last_name = kwargs.get('last_name', instance.last_name)
        instance.gender = kwargs.get('gender', instance.gender)

        telephone_numbers = kwargs.pop("patienttelephonenumbers_set", None)

        old_nums = instance.patienttelephonenumbers_set.all()
        new_nums = []
        if telephone_numbers:
            for num in telephone_numbers:
                try:
                    obj = PatientTelephoneNumbers.objects.get(
                        owner=instance,
                        telephone_number=num["telephone_number"]
                    )
                except:
                    obj = PatientTelephoneNumbers.objects.create(
                        owner=instance,
                        telephone_number=num["telephone_number"]
                    )
                new_nums.append(obj)

            for num_obj in old_nums:
                if num_obj not in new_nums:
                    num_obj.delete()

        instance.patienttelephonenumbers_set.set(new_nums)

        address = kwargs.pop("patientaddress", None)
        if address:
            instance.patientaddress.unit_number = address["unit_number"]
            instance.patientaddress.first_line = address["first_line"]
            instance.patientaddress.second_line = address["second_line"]
            instance.patientaddress.city = address["city"]
            instance.patientaddress.governorate = address["governorate"]
            instance.patientaddress.save()
        instance.save()
        return instance

    def get_registration(self, patient_id: int):

        registration = get_object_or_404(
            Registration, patient=patient_id, provider=self.provider)

        return registration

    def create_registration(self, patient_id: int):
        patient = get_object_or_404(Patient, pk=patient_id)
        new_registration = Registration.objects.create(
            patient=patient, provider=self.provider)

        return new_registration

    def emergency_access():
        # TODO 1: register an un authorized access event (date, time, user, provider)
        # TODO 2: Create a registration between the provider and the patient
        # TODO 3: Show this on the patient profile so the patient can see the an authorized access event and cancel the registration event
        # TODO 4:

        pass
