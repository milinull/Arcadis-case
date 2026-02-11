from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResultadosAmostrasViewSet, UploadPDFView

router = DefaultRouter()
router.register(r"amostras", ResultadosAmostrasViewSet)

urlpatterns = [
    path("upload-pdf/", UploadPDFView.as_view(), name="upload-pdf"),
    path("", include(router.urls)),
]