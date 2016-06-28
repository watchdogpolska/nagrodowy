from django.conf.urls import include, patterns, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^map/', include('wnioski.urls')),

    # admin
    url(r'^admin/', include(admin.site.urls)),
)
