from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

def api_root(request):
    return JsonResponse({
        "case1": "http://35.175.150.159:8000/api/case1/",
        "case2": "http://35.175.150.159:8000/api/case2/",
        "case3": "http://35.175.150.159:8000/api/case3/",
    })

schema_view = get_schema_view(
    openapi.Info(
        title="API Arcadis - Processamento de Dados",
        default_version="v1",
        description="""
        Documentação unificada das APIs de automação:
        
        * **Case 1**: Extração de dados químicos de PDF
        * **Case 2**: Análise de Risco Ambiental (Excel)
        * **Case 3**: Padronização e Conversão de Dados (Excel)
        """,
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/", api_root),
    path("admin/", admin.site.urls),
    path("api/case1/", include("case1.urls")),
    path("api/case2/", include("case2.urls")),
    path("api/case3/", include("case3.urls")),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Documentação Swagger
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    # Documentação ReDoc
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]