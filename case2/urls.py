from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AvaliacaoRiscoViewSet, UploadRiskView

router = DefaultRouter()
router.register(r'riscos', AvaliacaoRiscoViewSet) 

urlpatterns = [
    path("upload-risk/", UploadRiskView.as_view(), name="upload-risk"),
    path("", include(router.urls)),
]