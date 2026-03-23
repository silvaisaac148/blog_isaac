"""
DRF serializers for the Blog API.
"""

from rest_framework import serializers
from .models import Lapso, Post, MediaAttachment


class MediaAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAttachment
        fields = [
            "id",
            "media_type",
            "file",
            "external_url",
            "caption",
            "order",
        ]


class PostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for post listings (no full content)."""

    lapso_title = serializers.CharField(source="lapso.title", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "featured_image",
            "lapso",
            "lapso_title",
            "is_published",
            "created_at",
            "updated_at",
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    """Full serializer with content and nested media attachments."""

    media_attachments = MediaAttachmentSerializer(many=True, read_only=True)
    lapso_title = serializers.CharField(source="lapso.title", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "featured_image",
            "lapso",
            "lapso_title",
            "media_attachments",
            "is_published",
            "created_at",
            "updated_at",
        ]


class LapsoSerializer(serializers.ModelSerializer):
    posts = PostListSerializer(many=True, read_only=True)
    post_count = serializers.IntegerField(source="posts.count", read_only=True)

    class Meta:
        model = Lapso
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "order",
            "post_count",
            "posts",
        ]
