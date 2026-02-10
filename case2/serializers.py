from rest_framework import serializers
from .models import AvaliacaoRisco

class AvaliacaoRiscoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvaliacaoRisco
        fields = "__all__"