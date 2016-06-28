from django.http import HttpResponse
from django.shortcuts import render

from models import Adresat
from models import Wniosek, WniosekZalacznik
import json


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def array_to_json(arr, callback):
    data = json.dumps({'data': arr})
    ret = callback + '(' + data + ')'
    return HttpResponse(ret, content_type='application/json')


def get_map_markers(request, callback):
    recs = Wniosek.objects.all()

    arr = []
    for wniosek in recs:
        adr = wniosek.adresat
        if (adr.szerokosc_geo != None and adr.dlugosc_geo != None) or adr.miasto != None:
            arr.append(wniosek.get_map_marker())

    return array_to_json(arr, callback)


def get_marker_details(request, markerId, callback):
    recs = Wniosek.objects.filter(id=markerId)
    markerDetails = recs[0].get_map_marker_details()

    recs = WniosekZalacznik.objects.all().filter(wniosek=markerId)
    filesDetails = [obj.get_as_obj() for obj in recs]

    data = {'marker': markerDetails,
            'files': filesDetails}

    return array_to_json(data, callback)
