# -*- coding: utf-8 -*-
from django.contrib import admin
from django.db import models
from django.forms import Textarea

from models import Adresat, Miasto, Wniosek, WniosekHistoria, WniosekZalacznik

Config = {
    'zalacznik': {
        'textarea': {
            'rows': 2,
            'cols': 85
        }
    }
}


class WniosekHistoriaInline(admin.TabularInline):
    model = WniosekHistoria
    extra = 0


class WniosekZalacznikInline(admin.StackedInline):
    model = WniosekZalacznik
    extra = 1
    fields = ('plik', 'opis')
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs=Config['zalacznik']['textarea'])},
    }


class WniosekAdmin(admin.ModelAdmin):
    #     fieldsets = [ ('Podstawowe dane', {'fields' : ['adresat']}),  #, 'wprowadzenie_data' ]}),
    #                   ('Status', {'fields' : [ ('wniosek_status', 'aktualizacja_data' )]}),
    #                   ('Dodatkowe', {'fields' : ['opis']})
    #                 ]
    fields = ('adresat', 'wniosek_status', 'opis')
    list_display = ['id', 'adresat', 'wniosek_status', 'aktualizacja_data', 'wprowadzenie_data']
    list_display_links = ('id', 'adresat')

    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 6, 'cols': 85})},
    }
#     inlines = [WniosekHistoriaInline, WniosekZalacznikInline]
    inlines = [WniosekZalacznikInline]

    search_fields = ['adresat__nazwa', 'wniosek_status']


class AdresatAdmin(admin.ModelAdmin):
    fieldsets = [('Adresat', {'fields': ['nazwa']}),
                 #                 ('Lokalizacja', {'fields' : [ 'miasto', ('szerokosc_geo', 'dlugosc_geo')]})
                 ('Lokalizacja', {'fields': [('szerokosc_geo', 'dlugosc_geo')]})
                 ]
#     list_display = ['nazwa', 'miasto', 'szerokosc_geo', 'dlugosc_geo']
    list_display = ['nazwa', 'szerokosc_geo', 'dlugosc_geo']
    list_display_links = ['nazwa']

    search_fields = ['nazwa', 'szerokosc_geo', 'dlugosc_geo']


class MiastoAdmin(admin.ModelAdmin):
    fields = ('nazwa', ('szerokosc_geo', 'dlugosc_geo'))
    list_display = ['nazwa', 'szerokosc_geo', 'dlugosc_geo']


class WniosekZalacznikAdmin(admin.ModelAdmin):
    fields = ('wniosek', 'plik', 'opis')
    list_display = ['plik', 'wniosek', 'opis']

    search_fields = ['plik', 'wniosek', 'opis']

    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs=Config['zalacznik']['textarea'])},
    }

admin.site.register(WniosekZalacznik, WniosekZalacznikAdmin)
admin.site.register(Wniosek, WniosekAdmin)
admin.site.register(Adresat, AdresatAdmin)
admin.site.register(Miasto, MiastoAdmin)
