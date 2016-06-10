from django.contrib import admin
from django.db import models

from models import Adresat, Miasto
from models import Wniosek, WniosekHistoria
from django.forms import TextInput, Textarea

class WniosekHistoriaInline(admin.TabularInline):
    model = WniosekHistoria
    extra = 0
    

class WniosekAdmin(admin.ModelAdmin):
    fieldsets = [ ('Podstawowe dane', {'fields' : ['adresat', 'wprowadzenie_data' ]}),
                  ('Status', {'fields' : [ ('wniosek_status', 'aktualizacja_data' )]}),
                  ('Dodatkowe', {'fields' : ['opis']})
                ]
    list_display = ['id', 'adresat', 'wniosek_status', 'aktualizacja_data', 'wprowadzenie_data']
    
    inlines = [WniosekHistoriaInline]
    search_fields = ['adresat']
    
    
class AdresatAdmin(admin.ModelAdmin):
    fieldsets = [ ('Adresat', {'fields' : ['nazwa']}),
                  ('Lokalizacja', {'fields' : [ 'miasto', ('szerokosc_geo', 'dlugosc_geo')]})
                ]
    list_display = ['nazwa', 'miasto', 'szerokosc_geo', 'dlugosc_geo']


class MiastoAdmin(admin.ModelAdmin):
    fields = ('nazwa', ('szerokosc_geo', 'dlugosc_geo'))
    list_display = ['nazwa', 'szerokosc_geo', 'dlugosc_geo']



admin.site.register(Wniosek, WniosekAdmin)    
admin.site.register(Adresat, AdresatAdmin)    
admin.site.register(Miasto,  MiastoAdmin)    
