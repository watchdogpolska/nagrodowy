# -*- coding: utf-8 -*-
from datetime import datetime
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

# -----------------------------
#
# Miasto
#----------------

class Miasto(models.Model):
    class Meta:
        verbose_name_plural = "Miasta"    
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
    class Meta:
        verbose_name_plural = "Adresaci"
    
    def __unicode__(self):
        return "%s" % (self.nazwa)
       
    nazwa         = models.CharField('Adresat', unique=True, max_length=128)
    miasto        = models.ForeignKey(Miasto, blank=True, null=True)
    szerokosc_geo = models.FloatField('Szerokość geograficzna', blank=True, null=True)
    dlugosc_geo   = models.FloatField('Długość geograficzna', blank=True, null=True)
    
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
    class Meta:
        verbose_name_plural = "Wnioski"
            
    def __unicode__(self):
            return "%s" % self.adresat.nazwa
    
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
# WniosekZalcznik
#----------------

class WniosekZalacznik(models.Model):
    class Meta:
        verbose_name_plural = "Załączniki do wniosków"

    def __unicode__(self):
        return "%s" % (os.path.basename(str(self.plik)))
     
    uploadDir = "."
    wniosek = models.ForeignKey(Wniosek)
    opis    = models.TextField(blank=True, max_length=256)
    plik    = models.FileField(upload_to=uploadDir)
        
    def get_as_obj(self):
        dir, filename = os.path.split(self.plik.path)
        return {
                'file'        : filename,
                'description' : self.opis,
                'to'          : self.wniosek.adresat.nazwa,
                }

@receiver(post_delete, sender=WniosekZalacznik)
def zalacznik_post_delete_handler(sender, **kwargs):
    zalacznik = kwargs['instance']
    storage, path = zalacznik.plik.storage, zalacznik.plik.path
    storage.delete(path)

# -----------------------------
#
# WniosekHistoria
#----------------

class WniosekHistoria(models.Model):
    wniosek     = models.ForeignKey(Wniosek)
    zdarzenie   = models.TextField(blank=True)
    data        = models.DateTimeField('Data zdarzenia', default=datetime.now())

