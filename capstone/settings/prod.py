import common
from .common import *


SECRET_KEY = config("SECRET_KEY", cast=str)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]

# Application definition

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(FRONT_DIR, 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'capstone.wsgi.application'


DATABASE_URL = config("DATABASE_URL", default="", cast=str)

DATABASES = {
    'default':dj_database_url.config(default=DATABASE_URL)
}



SIMPLE_JWT = {
    "AUTH_HEADER_NAME": "HTTP_COOKIE",
    'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
    'AUTH_COOKIE': 'Authorization',
}


DYTE_ORG_PRESET_NAME = "group_call_host"
DYTE_ORG_PRESET_NAME_CL="group_call_participant"


CELERY_BROKER_URL = 'redis://redis:6379/1'

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/2",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}


EMAIL_HOST = 'smtp4dev'
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
EMAIL_PORT = 2525

