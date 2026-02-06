from rest_framework import serializers
from .models import AnaliseProcess, Contaminante, AvaliacaoRisco


class AnaliseProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnaliseProcess
        fields = "__all__"
        # Campos calculados pela View são apenas leitura
        read_only_fields = [
            "id",
            "valor_considerado",
            "valor_final",
            "aplicar_cinza",
            "aplicar_laranja",
        ]

    def create(self, validated_data):
        # Separar dados do Contaminante
        cas = validated_data.get("cas")
        nome = validated_data.get("nome")

        # Separar dados da Avaliação de Risco
        dados_avaliacao = {
            "efeito": validated_data.get("efeito"),
            "ambiente": validated_data.get("ambiente"),
            "vor": validated_data.get("vor"),
            "valor_vor": validated_data.get("valor_vor"),
            "concentracao_max": validated_data.get("concentracao_max"),
            "solu_concentracao": validated_data.get("solu_concentracao", 500),
        }

        # Tenta achar o contaminante pelo CAS. Se achar, atualiza o nome. Se não, cria.
        contaminante_obj, created = Contaminante.objects.update_or_create(
            cas=cas, defaults={"nome": nome}
        )

        # Cria a avaliação vinculada
        nova_avaliacao = AvaliacaoRisco.objects.create(
            contaminante=contaminante_obj, **dados_avaliacao
        )

        # Retorna o dado processado pela View (para o frontend ver o resultado)
        # O ID da view é o mesmo da tabela avaliacao_risco
        instance = AnaliseProcess.objects.get(id=nova_avaliacao.id)

        return instance
