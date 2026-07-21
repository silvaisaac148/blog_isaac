"""
API views for the Blog.
"""

from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Lapso, Post, MediaAttachment
from .serializers import (
    LapsoSerializer,
    PostListSerializer,
    PostDetailSerializer,
    MediaAttachmentSerializer,
)


class LapsoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Lapsos (tabs/sections).
    GET /api/lapsos/          → list all lapsos with nested posts
    GET /api/lapsos/{slug}/   → retrieve a single lapso
    """

    queryset = Lapso.objects.prefetch_related("posts").all()
    serializer_class = LapsoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Posts.
    GET  /api/posts/             → list published posts
    GET  /api/posts/{slug}/      → retrieve a single post (full detail)
    Supports filtering by ?lapso=<slug>
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "excerpt", "content"]
    ordering_fields = ["created_at", "title"]

    def get_queryset(self):
        queryset = Post.objects.select_related("lapso").prefetch_related(
            "media_attachments"
        )
        # Public users only see published posts
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True)

        # Filter by lapso slug
        lapso_slug = self.request.query_params.get("lapso")
        if lapso_slug:
            queryset = queryset.filter(lapso__slug=lapso_slug)
        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PostDetailSerializer
        return PostListSerializer


class MediaAttachmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for MediaAttachments.
    Typically managed via the admin, but exposed for programmatic access.
    """

    serializer_class = MediaAttachmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = MediaAttachment.objects.select_related("post")
        # Public users only see attachments belonging to published posts
        if not self.request.user.is_staff:
            queryset = queryset.filter(post__is_published=True)
        return queryset
