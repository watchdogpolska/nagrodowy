from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.views.generic.base import RedirectView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^map/', include('wnioski.urls')),

    # admin
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='https://siecobywatelska.pl')),
)
