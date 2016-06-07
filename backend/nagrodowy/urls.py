from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^cases/', include('wnioski.urls')),
    url(r'^wnioski/', include('wnioski.urls')),

    # admin
    url(r'^admin/', include(admin.site.urls)),
)
