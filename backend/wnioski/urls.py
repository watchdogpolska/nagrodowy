from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^get_map_markers/callback=([a-zA-Z0-9-_.]{1,32})$',                  views.get_map_markers, name='get_map_markers'),
    url(r'^get_marker_details/([0-9]{1,32})/callback=([a-zA-Z0-9-_.]{1,32})$', views.get_marker_details, name='get_marker_details'), 
]