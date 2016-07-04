from django.conf import settings
from django.conf.urls import include, patterns, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from wnioski.viewsets import MapMarkerDetailsViewSet, MapMarkerViewSet

router = DefaultRouter()
router.register(r'get_map_markers', MapMarkerViewSet)
router.register(r'get_map_markers_details', MapMarkerDetailsViewSet)

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^map/', include('wnioski.urls')),
    url(r'^api/', include(router.urls)),
    # admin
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )
