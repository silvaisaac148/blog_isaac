"""
Blog API URL configuration.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LapsoViewSet, PostViewSet, MediaAttachmentViewSet

router = DefaultRouter()
router.register(r"lapsos", LapsoViewSet, basename="lapso")
router.register(r"posts", PostViewSet, basename="post")
router.register(r"media", MediaAttachmentViewSet, basename="media")

urlpatterns = [
    path("", include(router.urls)),
]
