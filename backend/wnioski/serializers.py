from rest_framework import serializers

from .models import Adresat, Miasto, WniosekZalacznik, Wniosek


class MiastoSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.CharField(source='city')
    lat = serializers.CharField(source='szerokosc_geo')
    long = serializers.CharField(source='dlugosc_geo')

    class Meta:
        model = Miasto
        fields = ('name', 'lat', 'long')


class WniosekZalacznikSerializer(serializers.HyperlinkedModelSerializer):
    file = serializers.CharField(source='filename')
    description = serializers.CharField(source='opis')
    to = serializers.CharField(source='wniosek.adresat.nazwa')

    class Meta:
        model = WniosekZalacznik
        fields = ('file', 'description', 'to')


class AdresatSerializer(serializers.HyperlinkedModelSerializer):
    nazwa = serializers.CharField()
    city = MiastoSerializer(source='miasto')

    class Meta:
        model = Adresat
        fields = ('nazwa', 'city')


class WniosekSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(source='pk')
    status = serializers.CharField(source='wniosek_status')
    lat = serializers.CharField(source='adresat.szerokosc_geo')
    long = serializers.CharField(source='adresat.dlugosc_geo')
    city = MiastoSerializer(source='adresat.miasto')

    class Meta:
        model = Wniosek
        fields = ('id', 'status', 'lat', 'long', 'city')


class WniosekDetailsSerializer(WniosekSerializer):
    opis = serializers.CharField()
    adresat = AdresatSerializer()
    files = WniosekZalacznikSerializer(source='wniosekzalacznik_set', many=True)

    class Meta:
        model = Wniosek
        fields = WniosekSerializer.Meta.fields + ('opis', 'adresat', 'files')
