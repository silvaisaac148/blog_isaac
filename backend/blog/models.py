"""
Models for the Blog Portafolio — Gerencia y Mercadeo.

Three core models:
- Lapso: Represents each navigable section/tab.
- Post: A blog entry (assignment, analysis, etc.) inside a Lapso.
- MediaAttachment: Multimedia files attached to a Post.
"""

from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class Lapso(models.Model):
    """
    Represents a tab/section in the blog navigation.
    Pre-populated with: Presentación, Lapso 1, Lapso 2, Lapso 3, Lapso 4.
    """

    title = models.CharField(max_length=100, verbose_name="Título")
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, verbose_name="Descripción")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")

    class Meta:
        ordering = ["order"]
        verbose_name = "Lapso"
        verbose_name_plural = "Lapsos"

    def __str__(self):
        return self.title


class Post(models.Model):
    """
    A blog entry under a specific Lapso. Supports rich text content
    via CKEditor 5 for articles, analyses, and assignments.
    """

    lapso = models.ForeignKey(
        Lapso,
        on_delete=models.CASCADE,
        related_name="posts",
        verbose_name="Lapso",
    )
    title = models.CharField(max_length=255, verbose_name="Título")
    slug = models.SlugField(max_length=255, unique=True)
    excerpt = models.TextField(
        max_length=500,
        blank=True,
        verbose_name="Extracto",
        help_text="Resumen corto que se muestra en las tarjetas del listado.",
    )
    content = CKEditor5Field(
        verbose_name="Contenido",
        config_name="default",
    )
    featured_image = models.ImageField(
        upload_to="posts/featured/",
        blank=True,
        null=True,
        verbose_name="Imagen destacada",
    )
    is_published = models.BooleanField(default=False, verbose_name="Publicado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Actualizado")

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Publicación"
        verbose_name_plural = "Publicaciones"

    def __str__(self):
        return self.title


class MediaAttachment(models.Model):
    """
    Multimedia file attached to a Post.
    Supports images, videos (uploaded or embedded), and documents.
    """

    class MediaType(models.TextChoices):
        IMAGE = "image", "Imagen"
        VIDEO = "video", "Video"
        PDF = "pdf", "PDF"
        WORD = "word", "Word (DOC/DOCX)"
        POWERPOINT = "powerpoint", "PowerPoint (PPT/PPTX)"
        EXCEL = "excel", "Excel (XLS/XLSX)"
        DOCUMENT = "document", "Otro documento"

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="media_attachments",
        verbose_name="Publicación",
    )
    media_type = models.CharField(
        max_length=12,
        choices=MediaType.choices,
        default=MediaType.IMAGE,
        verbose_name="Tipo de medio",
    )
    file = models.FileField(
        upload_to="posts/media/",
        blank=True,
        null=True,
        verbose_name="Archivo",
        help_text="Formatos aceptados: imágenes (JPG, PNG), videos (MP4, AVI), PDF, Word, Excel, PowerPoint.",
    )
    external_url = models.URLField(
        blank=True,
        verbose_name="URL externa",
        help_text="URL de YouTube, Vimeo u otra plataforma para incrustar.",
    )
    caption = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Descripción",
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")

    class Meta:
        ordering = ["order"]
        verbose_name = "Archivo multimedia"
        verbose_name_plural = "Archivos multimedia"

    def __str__(self):
        return f"{self.get_media_type_display()} — {self.caption or self.pk}"
