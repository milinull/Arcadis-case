from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DadosColetadosViewSet, UploadExcelView

router = DefaultRouter()
router.register(r"dados", DadosColetadosViewSet)

urlpatterns = [
    path("upload-excel/", UploadExcelView.as_view(), name="upload-excel"),
    path("", include(router.urls)),
]
