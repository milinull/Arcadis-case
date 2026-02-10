from rest_framework import serializers
from .models import ResultadosAmostras


class ResultadosAmostrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultadosAmostras
        fields = "__all__"

