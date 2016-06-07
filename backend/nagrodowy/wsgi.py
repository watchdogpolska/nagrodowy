"""
For more information on this file, see
https://docs.djangoproject.com/en/dev/howto/deployment/wsgi/
"""

import sys
import os
from django.core.wsgi import get_wsgi_application

sys.path.append('/var/www/virtuals/nagrodowy/backend')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nagrodowy.settings")
application = get_wsgi_application()
