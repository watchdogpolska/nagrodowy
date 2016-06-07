#!/usr/bin/python
# -*- coding: utf-8 -*-

import unicodedata
import re
import os
import sys
import codecs
import unicodedata


f  = codecs.open("data.txt", "r")
i=1
for row in f:
    final = {}
    r = row.split(';')
    urzad = r[1]
    print  "(" + str(i) +", '" + urzad +"', NULL, "+ r[0] +"), \\"
    i = i+1

print "---------------------------------"

f  = codecs.open("data.txt", "r")
i=1
for row in f:
    final = {}
    r = row.split(';')
    urzad = r[1]
    opis = r[2]
    opis = opis[:-1]
    print  "(" + str(i) +", " + str(i) +", 'Nagrody : " + urzad +"', '"+ opis+"', 'OPEN', '2016-06-06 23:15:14', '2016-06-06 23:15:17'" +"), \\"
    i = i+1


#   INSERT INTO wnioski_wniosek (id, adresat_id, tytul, opis, wniosek_status, wprowadzenie_data, aktualizacja_data) VALUES
#     (1, 1, 'Nagrody za rok 2016', 'Jakis opis - opcjonalny', 'OPEN', '2016-06-06 23:15:14', '2016-06-06 23:15:17'),
    
#   INSERT INTO wnioski_adresat (id, nazwa, miasto_id, szerokosc_geo, dlugosc_geo) VALUES \
#       (1, 'Urzad Miasta Szczecin', 2, 53.438221, 14.543189), \
# 