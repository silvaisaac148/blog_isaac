"""
Admin configuration for the Blog app.
"""

from django.contrib import admin
from .models import Lapso, Post, MediaAttachment


class MediaAttachmentInline(admin.TabularInline):
    """Inline editor for media attachments inside the Post admin."""

    model = MediaAttachment
    extra = 1
    fields = ("media_type", "file", "external_url", "caption", "order")


@admin.register(Lapso)
class LapsoAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "lapso", "is_published", "created_at")
    list_filter = ("lapso", "is_published")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ("is_published",)
    inlines = [MediaAttachmentInline]
    fieldsets = (
        (None, {
            "fields": ("lapso", "title", "slug", "excerpt", "featured_image"),
        }),
        ("Contenido", {
            "fields": ("content",),
        }),
        ("Estado", {
            "fields": ("is_published",),
        }),
    )
