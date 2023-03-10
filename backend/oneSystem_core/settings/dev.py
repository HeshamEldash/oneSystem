from .common import *
import environ
import os

env = environ.Env()
environ.Env.read_env(env_file= os.path.join(BASE_DIR.parent, '.env'))
    
DEBUG = True
SECRET_KEY=env("SECRET_KEY")
SIGNING_KEY = "VK15OxWDH8e1gw_cKrdD2Ktoqm4ozUvBxBtYMzkwAjc"
ALLOWED_HOSTS=["127.0.0.1"]


FRONT_ENDPOINT = env("FRONT_ENDPOINT")

# print(ALLOWED_HOSTS)



SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=50000),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=100),
    'ROTATE_REFRESH_TOKENS': False, #switch to tru in prod
    'BLACKLIST_AFTER_ROTATION': False, #switch to tru in prod
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SIGNING_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR.parent / 'oneSysDb.sqlite3',
    }
}



CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
CORS_ALLOW_ALL_ORIGINS = True