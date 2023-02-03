from rest_framework.exceptions import APIException



class CustomIntegrityError(APIException):
    status_code = 409
    default_detail = 'these credentials arelady exists.'
    default_code = "service_unavailable"