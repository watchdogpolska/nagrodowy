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
        ('REGISTERED',          'Wprowadzony'),
        ('IN-PROGRESS',         'W toku'),
        ('DONE-SUCCESSFUL',     'Zakończone pomyślnie'),
        ('DONE-UNSUCCESSFUL',   'Zakończone niepomyślnie')
    )
    
    adresat         = models.ForeignKey(Adresat)
    tytul           = models.CharField(max_length=128)
    opis            = models.TextField(blank=True)
    wniosek_status  = models.CharField(max_length=32, default='REGISTERED', choices=WNIOSEK_STATUS)
    wprowadzenie_data  = models.DateTimeField('Data wprowadzenia', default=datetime.now())
    aktualizacja_data  = models.DateTimeField('Data ostatniej aktualizacji', blank=True, null=True )

#     def __unicode__(self):
#         return "%s %s" % ( self.adresat.nazwa, self.info ) # % (self.adresat.nazwa, self.info)

    def as_dict(self):
        return {
            'id'        : self.id,
            'adresat'   : self.adresat.nazwa,
            'info'      : self.info
        }


# -----------------------------
#
# WniosekHistoria
#----------------

class WniosekHistoria(models.Model):
    wniosek     = models.ForeignKey(Wniosek)
    zdarzenie   = models.TextField(blank=True)
    data        = models.DateTimeField('Data zdarzenia', default=datetime.now())

