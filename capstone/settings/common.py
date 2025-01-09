import os, json
from pathlib import Path
from datetime import timedelta
from celery.schedules import crontab
from decouple import config
import dj_database_url


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

FRONT_DIR = BASE_DIR / "cap-frontend"


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "djoser",
    "consultation",
    "core",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "capstone.urls"


INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]

CORS_ALLOWED_ORIGINS = json.loads(config("CORS_ALLOWED_ORIGINS", cast=str))

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = json.loads(config("CORS_ORIGIN_WHITELIST", cast=str))

CSRF_TRUSTED_ORIGINS = json.loads(config("CSRF_TRUSTED_ORIGINS", cast=str))


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


WSGI_APPLICATION = "capstone.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

if not config("PROD", cast=bool):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASE_URL = config("DATABASE_URL_local", default="", cast=str)
    DATABASES = {"default": dj_database_url.config(default=DATABASE_URL)}


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = [FRONT_DIR / "dist/assets"]

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "core.User"

REST_FRAMEWORK = {
    "COERCE_DECIMAL_TO_STRING": False,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
        "core.authentication.CustomAuthentication",
    ),
}


DJOSER = {
    "SERIALIZERS": {
        "user_create": "core.serializers.UserCreateSerializer",
        "current_user": "core.serializers.UserSerializer",
    }
}


CELERY_BROKER_URL = "redis://localhost:6379/1"

CELERY_RESULT_BACKEND = "redis://localhost:6379/1"

CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"

CELERY_QUEUES = {
    "eventlet": {
        "exchange": "eventlet",
        "exchange_type": "direct",
        "binding_key": "eventlet",
    },
    "prefork": {
        "exchange": "prefork",
        "exchange_type": "direct",
        "binding_key": "prefork",
    },
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://localhost:6379/2",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}


CELERY_BEAT_SCHEDULE = {
    "notify_customers": {
        "task": "consultation.bg_tasks.notify_client",
        "schedule": crontab(day_of_week=1, hour=7, minute=30),
        "args": ["HELLO WORLD"],
    }
}
