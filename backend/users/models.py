
from django.db import models
from django.db.models import Q
from django.contrib.auth.models import (PermissionsMixin)
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail
# query comes in with p details
# should search through the list of Ps
# Returns the Ps that match the details and registered
# option to return the Ps that are not registered
#
# P.objects.filter (first_name__icontains,).filter


#
# 2nd option
# search through the registrations for a match
# an option to search the full list
# Registrations.objects.filter(p = ())
#



class AccountManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            is_superuser=True,

        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email"), max_length=200, unique=True)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_active = models.BooleanField(_("active"), default=True)
    is_admin = models.BooleanField(_("staff status"), default=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AccountManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    # @property
    # def is_staff(self):
    #     if self.staff:
    #         return self.staff.full_name

    @property
    def is_patient(self):
        return self.patient

    def __str__(self):
        return self.email

    @property
    def get_name(self):
        if self.is_staff:
            return self.staff.full_name
        if self.is_patient:
            return self.is_patient


class BaseProfile(models.Model):
    title = models.CharField(_("title"), max_length=20,
                             unique=False, null=True)
    first_name = models.CharField(
        _("first name"), max_length=100, unique=False, null=False)
    middle_names = models.CharField(
        _("middle names"), max_length=100, unique=False, blank=True, default="")
    last_name = models.CharField(
        _("last name"), max_length=100, unique=False, null=False)

    class Meta:
        abstract = True


class PatientQuesrySet(models.QuerySet):
    def is_registered(self):
        return self.filter()


class PatientManager(models.Manager):
    def search(self, query, user=None):
        pass


class Patient(BaseProfile, models.Model):
    MALE = "MALE"
    FEMALE = "FEMALE"

    GENDER_CHOICES = (
        (MALE, _('Male')),
        (FEMALE, _('Female'))
    )

    date_of_birth = models.DateField(
        _("date of birth"), null=False, unique=False)
    account = models.OneToOneField(
        Account, on_delete=models.CASCADE, null=True)
    gender = models.CharField(
        _("gender"), max_length=6, choices=GENDER_CHOICES, default=MALE)

    class Meta:
        verbose_name = _("patient")
        verbose_name_plural = _("patients")

    def __str__(self):
        return f"{self.first_name} {self.middle_names} {self.last_name}"


class Staff(BaseProfile, models.Model):
    DOCTOR = "DR"
    NURSE = "NR"
    MANAGER = "MG"
    ADMIN = "AD"
    PRACTITIONER = "PC"

    ROLE_CHOICES = (
        (DOCTOR, _('Doctor')),
        (NURSE, _('Nurse')),
        (MANAGER, _('Manger')),
        (PRACTITIONER, _('Practitioner')),
        (ADMIN, _('Admin')),
    )

    professional_number = models.CharField(
        _("professional number"), max_length=100, unique=False, blank=True, default="")
    staff_role = models.CharField(
        _("user role"), max_length=2, choices=ROLE_CHOICES)
    account = models.OneToOneField(Account, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("staff")
        verbose_name_plural = _("staff")

    def __str__(self):
        return f"{self.title} {self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


def provider_dir_path(instance, filename):
    return f"provider_{instance.id}/{filename}"


class Provider(models.Model):
    owner = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(_("name"), max_length=100,
                            unique=False, null=False)
    date_created = models.DateTimeField(_("date created"), auto_now_add=True)
    staff = models.ManyToManyField(Staff)
    patients = models.ManyToManyField(Patient, through="Registration")

    # logo= models.FileField(
    #     _("file"),
    #     upload_to=provider_dir_path
    #     null=True,
    #     blank=True

    # )
    class Meta:
        verbose_name = _("health care provider")
        verbose_name_plural = _("health care providers")

    def __str__(self):
        return self.name


class Employment(models.Model):
    DOCTOR = "DR"
    NURSE = "NR"
    MANAGER = "MG"
    ADMIN = "AD"
    PRACTITIONER = "PC"
    OWNER = "OW"

    ROLE_CHOICES = (
        (DOCTOR, _('Doctor')),
        (NURSE, _('Nurse')),
        (MANAGER, _('Manger')),
        (PRACTITIONER, _('Practitioner')),
        (ADMIN, _('Admin')),
        (OWNER, _('Owner')),
    )
    

    provider = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)
    staff = models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    date_employed = models.DateField(auto_now_add=True)
    date_employment_end = models.DateField(null=True)
    salary = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    is_active = models.BooleanField(default=True)
    employment_role = models.CharField(_("user role"), max_length=2, choices=ROLE_CHOICES)
    
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['provider', 'staff'], condition=Q(is_active=True),
                                    name='unique_employment')
        ]

    
    def __str__(self):
        return f"Employment: provider: {self.provider}, staff: {self.staff} "


    
class Registration(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    provider = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)
    date_registered = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    date_registration_end = models.DateTimeField(null=True)
    

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['provider', 'patient'], condition=Q(is_active=True),
                                    name='unique_registration')
        ]
        
class Branch(models.Model):
    branch_name = models.CharField(
        _("name"), max_length=200, unique=False, null=False)
    provider = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.branch_name


class PatientAddress(models.Model):
    unit_number = models.CharField(_("unit number"), max_length=10, unique=False, blank=True, default="")
    first_line = models.CharField( _("fisrt line"), max_length=200, unique=False, blank=True, default="")
    second_line = models.CharField(_("second line"), max_length=200, unique=False, blank=True, default="")
    city = models.CharField(_("city"), max_length=200, unique=False, blank=True, default="")
    governorate = models.CharField(_("governorate"), max_length=200, unique=False, blank=True, default="")
    
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return f"{self.unit_number} {self.first_line} {self.city} {self.governorate}"


class BranchAddress(models.Model):
    unit_number = models.CharField(_("unit number"), max_length=10, unique=False, blank=True, default="")
    first_line = models.CharField( _("fisrt line"), max_length=200, unique=False, blank=True, default="")
    second_line = models.CharField(_("second line"), max_length=200, unique=False, blank=True, default="")
    city = models.CharField(_("city"), max_length=200, unique=False, blank=True, default="")
    governorate = models.CharField(_("governorate"), max_length=200, unique=False, blank=True, default="")
    
    branch = models.OneToOneField(Branch, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.unit_number} {self.first_line} {self.city} {self.governorate}"


class Address(models.Model):
    unit_number = models.CharField(
        _("unit number"), max_length=10, unique=False, blank=True, default="")
    first_line = models.CharField(
        _("fisrt line"), max_length=200, unique=False, blank=True, default="")
    second_line = models.CharField(
        _("second line"), max_length=200, unique=False, blank=True, default="")
    city = models.CharField(_("city"), max_length=200,
                            unique=False, blank=True, default="")
    governorate = models.CharField(
        _("governorate"), max_length=200, unique=False, blank=True, default="")

    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
    branch = models.OneToOneField(
        Branch, on_delete=models.CASCADE, null=True)
    staff = models.OneToOneField(Staff, on_delete=models.CASCADE, null=True)
    patient = models.OneToOneField(
        Patient, on_delete=models.CASCADE, null=True)

    @property
    def owner(self):
        if self.provider_id is not None:
            return self.provider.id
        if self.branch_id is not None:
            return self.branch.id
        if self.staff_id is not None:
            return self.staff.id
        if self.patient_id is not None:
            return self.patient.id
        else:
            return None

    def __str__(self):
        return f"{self.unit_number} {self.first_line} {self.city} {self.governorate}"





class PatientTelephoneNumbers(models.Model):
    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=False, null=False)
    owner = models.ForeignKey("Patient", on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.telephone_number
    
class StaffTelephoneNumbers(models.Model):
    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=False, null=False)
    owner = models.ForeignKey("Staff", on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.telephone_number
    
class BranchTelephoneNumbers(models.Model):
    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=False, null=False)
    owner = models.ForeignKey("Branch", on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.telephone_number
    
class ProviderTelephoneNumbers(models.Model):
    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=False, null=False)
    owner = models.ForeignKey("Provider", on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.telephone_number






class TelephoneNumber(models.Model):
    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=False, null=False)

    owner_provider = models.ForeignKey(
        "Provider", related_name="phone_nums", on_delete=models.CASCADE, null=True)
    owner_branch = models.ForeignKey(
        "Branch", related_name="phone_nums", on_delete=models.CASCADE, null=True)
    owner_staff = models.ForeignKey(
        "Staff", related_name="phone_nums", on_delete=models.CASCADE, null=True)
    owner_patient = models.ForeignKey(
        "Patient", related_name="phone_nums", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.telephone_number




# User events
class LoginToProviderEvent(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    provider = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['start_time']
