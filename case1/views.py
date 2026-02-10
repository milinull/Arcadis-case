from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
import pandas as pd
import tempfile
import os

from .models import ResultadosAmostras
from .serializers import ResultadosAmostrasSerializer
from .utils import processar_dataframe, gerar_excel_formatado 

class ResultadosAmostrasViewSet(viewsets.ModelViewSet):
    queryset = ResultadosAmostras.objects.all().order_by("id")
    serializer_class = ResultadosAmostrasSerializer

class UploadPDFView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    # Req POST
    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "Nenhum arquivo enviado"}, status=status.HTTP_400_BAD_REQUEST)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            for chunk in file_obj.chunks():
                tmp.write(chunk)
            tmp_path = tmp.name

        try:
            # Processa e limpa os dados
            df = processar_dataframe(tmp_path)

            # Salva no Banco de Dados
            objetos_para_salvar = []
            for _, row in df.iterrows():
                data_coleta = pd.to_datetime(row["Data de coleta"], dayfirst=True).date()
                
                objetos_para_salvar.append(
                    ResultadosAmostras(
                        id_interna=row["Identificação interna"],
                        nome_amostra=row["Nome da amostra"],
                        data_coleta=data_coleta,
                        horario_coleta=row["Horário de coleta"],
                        param_quimi=row["Parâmetro químico"],
                        resultado=row["Resultados"],
                        unidade=row["Unidade"],
                        limite_quant=row["Limite de Quantificação (LQ)"]
                    )
                )
            
            ResultadosAmostras.objects.bulk_create(objetos_para_salvar)

            # Gera o Excel
            excel_file = gerar_excel_formatado(df)

            # Prepara a resposta HTTP
            response = HttpResponse(
                excel_file.getvalue(),
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            response['Content-Disposition'] = f'attachment; filename="processado_{file_obj.name}.xlsx"'
            
            return response

        except Exception as e:
            print(f"Erro no processamento: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)