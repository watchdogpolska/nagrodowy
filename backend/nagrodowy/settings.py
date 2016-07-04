"""
Django settings for nagrodowy project.

For more information on this file, see
https://docs.djangoproject.com/en/dev/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/dev/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import environ
ROOT = environ.Path(__file__) - 2
env = environ.Env()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/dev/howto/deployment/checklist/

# from django.utils.translation import ugettext_lazy as _

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0&s=bbzdy&@pr3ngzh!qpj+8m-2g0&4%-i25d&5e92p9swv*=y'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
# TEMPLATE_DEBUG = True

DEBUG = False
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['localhost', ]


# Application definition

INSTALLED_APPS = (
    'wnioski',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'nagrodowy.urls'

WSGI_APPLICATION = 'nagrodowy.wsgi.application'


# Database
# https://docs.djangoproject.com/en/dev/ref/settings/#databases

DATABASES = {
    'default': env.db(default="mysql://nagrodowy:nagrodowy@localhost/")
}

# Internationalization
# https://docs.djangoproject.com/en/dev/topics/i18n/

# LANGUAGE_CODE = 'en-us'
# TIME_ZONE = 'UTC'

LANGUAGE_CODE = 'pl'
TIME_ZONE = 'Europe/Warsaw'

# LANGUAGES = ( ('pl', ('Polish')) )

USE_I18N = True

USE_L10N = True

USE_TZ = True

MEDIA_ROOT = str(ROOT("storage"))
MEDIA_URL = "/storage/"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/dev/howto/static-files/

STATIC_URL = '/static/'
