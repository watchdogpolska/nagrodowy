from django.http import HttpResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from models import Wniosek, WniosekZalacznik
import json


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def array_to_json(arr, callback):
    data = json.dumps({'data': arr})
    ret = callback + '(' + data + ')'
    return HttpResponse(ret, content_type='application/json')


def get_map_markers(request, callback):
    filters = Q(Q(adresat__szerokosc_geo__isnull=False) & Q(adresat__dlugosc_geo__isnull=False)) | \
                    Q(adresat__miasto__isnull=False)
    recs = Wniosek.objects.filter(filters).all()
    return array_to_json((x.get_map_marker() for x in recs), callback)


def get_marker_details(request, markerId, callback):
    data = {'marker': get_object_or_404(Wniosek, pk=markerId).get_map_marker_details(),
            'files':  (obj.get_as_obj()
                       for obj in WniosekZalacznik.objects.filter(wniosek=markerId))}

    return array_to_json(data, callback)
