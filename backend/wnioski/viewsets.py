from rest_framework import viewsets

from .models import Wniosek
from .serializers_legacy import WniosekDetailsSerializer, WniosekSerializer


class MapMarkerViewSet(viewsets.ModelViewSet):
    queryset = Wniosek.objects.select_related('adresat__miasto').all()
    serializer_class = WniosekSerializer


class MapMarkerDetailsViewSet(viewsets.ModelViewSet):
    queryset = MapMarkerViewSet.queryset.prefetch_related('wniosekzalacznik_set').all()
    serializer_class = WniosekDetailsSerializer
