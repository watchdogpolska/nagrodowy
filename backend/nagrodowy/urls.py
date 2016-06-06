from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'nagrodowy.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^cases/', include('wnioski.urls')),
    url(r'^wnioski/', include('wnioski.urls')),
#     url(r'^admin/', admin.site.urls),

    url(r'^admin/', include(admin.site.urls)),
)

# 
# urlpatterns = [
# ]
