# -*- coding: utf-8 -*-
from datetime import datetime
from django.db import models

# -----------------------------
#
# Miasto
#----------------

class Miasto(models.Model):
    nazwa           = models.CharField('Miasto', max_length=64)
    szerokosc_geo   = models.FloatField('Szerokość geograficzna', blank=True, null=True)
    dlugosc_geo     = models.FloatField('Długość geograficzna', blank=True, null=True)

    def __unicode__(self):
            return "%s" % self.nazwa


# -----------------------------
#
# Adresat
#----------------

class Adresat(models.Model):
    nazwa         = models.CharField('Adresat', unique=True, max_length=128)
    miasto        = models.ForeignKey(Miasto, blank=True, null=True)
    szerokosc_geo = models.FloatField('Szerokość geograficzna', blank=True, null=True)
    dlugosc_geo   = models.FloatField('Długość geograficzna', blank=True, null=True)
    
    def __unicode__(self):
        return "%s" % (self.nazwa)
    
    def as_dict(self):
        return {
            'id': self.id,
#             'skrot': self.skrot,
#             'nazwa': self.nazwa
        }

# -----------------------------
#
# Wniosek
#----------------

class Wniosek(models.Model):
    WNIOSEK_STATUS = (
        ('IN-PROGRESS',                     'W toku'),
        ('IN-PROGRESS-PARTIALLY-FAILED',    'W toku - opinia częściowo negatywna'),
        ('IN-PROGRESS-PARTIALLY-SUCCESSFUL','W toku - opinia częściowo pozytywna'),
        ('CLOSED-SUCCESSFUL',               'Zakończone pomyślnie'),
        ('CLOSED-MOSTLY-SUCCESSFUL',        'Zakończone głównie pomyślnie'),
        ('CLOSED-FAILED',                   'Zakończone negatywnie'),
        ('CLOSED-MOSTLY-FAILED',            'Zakończone głównie negatywnie'),
    )
    
    adresat         = models.ForeignKey(Adresat)
    opis            = models.TextField(blank=True)
    wniosek_status  = models.CharField(max_length=64, default='IN-PROGRESS', choices=WNIOSEK_STATUS)
    wprowadzenie_data  = models.DateTimeField('Data wprowadzenia', default=datetime.now())
    aktualizacja_data  = models.DateTimeField('Data ostatniej aktualizacji', blank=True, null=True )

#     def __unicode__(self):
#         return "%s %s" % ( self.adresat.nazwa, self.info ) # % (self.adresat.nazwa, self.info)

    def get_map_marker(self):
        ret = {
            'id'   : self.id,
            'status': self.wniosek_status,
            'lat'  : self.adresat.szerokosc_geo,
            'long' : self.adresat.dlugosc_geo
        }
        
        if self.adresat.miasto != None :
            ret['city'] = {   
                'name' : self.adresat.miasto.nazwa,
                'lat'  : self.adresat.miasto.szerokosc_geo,
                'long' : self.adresat.miasto.dlugosc_geo,
                        }
        return ret
        
    def get_map_marker_details(self):
        ret= {
            'id'    : self.id,
            'status': self.wniosek_status,
            'opis'  : self.opis,
#             'wprowadzony' : self.wprowadzenie_data,
#             'aktualizacja' : self.aktualizacja_data,
            'adresat' : {
                         'nazwa' : self.adresat.nazwa,
#                          'city'  : { 
#                                    'name' : self.adresat.miasto.nazwa,
#                                    'lat'  : self.adresat.miasto.szerokosc_geo,
#                                    'long' : self.adresat.miasto.dlugosc_geo 
#                                    },
            },
            'lat'  : self.adresat.szerokosc_geo,
            'long' : self.adresat.dlugosc_geo
        }
        
        if self.adresat.miasto != None :
            ret['adresat']['city'] = {   
                'name' : self.adresat.miasto.nazwa,
                'lat'  : self.adresat.miasto.szerokosc_geo,
                'long' : self.adresat.miasto.dlugosc_geo,
            }
        return ret
        

# -----------------------------
#
# WniosekHistoria
#----------------

class WniosekHistoria(models.Model):
    wniosek     = models.ForeignKey(Wniosek)
    zdarzenie   = models.TextField(blank=True)
    data        = models.DateTimeField('Data zdarzenia', default=datetime.now())

