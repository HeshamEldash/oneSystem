from django.db import models
from django.contrib.auth.models import (PermissionsMixin , AbstractUser)
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail


class MyUserManager(BaseUserManager):
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



class MyUser(AbstractBaseUser,PermissionsMixin):

    email = models.EmailField(_("email"), max_length=100, unique=True)
    title = models.CharField(_("title"),max_length=20, unique=False, null=True)
    first_name = models.CharField(_("first name"), max_length=100,  unique= False, null= False)
    middle_names = models.CharField(_("middle names"), max_length=100, unique= False, null=True, default= "")
    last_name = models.CharField(_("last name"), max_length=100, unique= False, null= False)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)


    is_active = models.BooleanField(_("active"), default=True)
    is_admin = models.BooleanField(_("staff status"), default=False)



    USERNAME_FIELD = 'email'
    EMAIL_FIELD= 'email'
    REQUIRED_FIELDS = []


    objects = MyUserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin



    def __str__(self):
        return self.email



class Patient(MyUser):

    date_of_birth = models.CharField(_("date of birth"), max_length=100, null=False, unique=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Staff(MyUser):
    DOCTOR = "DR"
    NURSE = "NR"
    MANAGER = "MG"
    ADMIN = "AD"
    PRACTITIONER = "PC"

    ROLE_CHOICES = (
        (DOCTOR, 'doctor'),
        (NURSE, 'nurse'),
        (MANAGER, 'manger'),
        (PRACTITIONER, 'practitioner'),
        (ADMIN, 'admin'),
    )

    professional_number = models.CharField(_("professional number"),max_length=100, unique=True, null=True)
    staff_role = models.CharField(_("user type"), max_length=2,choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Provider (models.Model):

    name = models.CharField(_("first name"), max_length=100, unique=False, null=False)
    date_created = models.DateTimeField(_("date joined"), default=timezone.now)
    staff = models.ManyToManyField(Staff)
    patient = models.ManyToManyField(Patient)


    def __str__(self):
        return self.name


class Address(models.Model):

    unit_number = models.CharField(_("unit number"), max_length=10, unique=False, null=False)
    first_line = models.CharField(_("fisrt line"), max_length=200, unique=False, null=False)
    second_line = models.CharField(_("second line"), max_length=200, unique=False, null=True)
    city = models.CharField(_("city"), max_length=200, unique=False, null=False)
    governrate = models.CharField(_("governrate"), max_length=200, unique=False, null=False)
    provider_address = models.ForeignKey(Provider,on_delete=models.CASCADE, null=True)
    MyUser_address = models.ForeignKey(MyUser,on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.unit_number} {self.first_line} {self.city} {self.governrate}"


class TelephoneNumber(models.Model):


    telephone_number = models.CharField(_("telephone number"), max_length=100, unique=True, null=False)
    provider_number = models.ForeignKey(Provider,on_delete=models.CASCADE, null=True)
    MyUser_number = models.ForeignKey(MyUser,on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.telephone_number

