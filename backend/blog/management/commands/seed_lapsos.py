"""
Management command to seed the 5 required Lapso sections.
Run: python manage.py seed_lapsos
"""

from django.core.management.base import BaseCommand
from blog.models import Lapso


class Command(BaseCommand):
    help = "Crea los 5 Lapsos iniciales para el blog portafolio."

    def handle(self, *args, **options):
        lapsos = [
            {
                "title": "Presentación",
                "slug": "presentacion",
                "description": (
                    "Objetivo general del proyecto, presentación del subproyecto "
                    "y perfil como futuro Ingeniero en Informática."
                ),
                "order": 0,
            },
            {"title": "Lapso 1", "slug": "lapso-1", "description": "", "order": 1},
            {"title": "Lapso 2", "slug": "lapso-2", "description": "", "order": 2},
            {"title": "Lapso 3", "slug": "lapso-3", "description": "", "order": 3},
            {"title": "Lapso 4", "slug": "lapso-4", "description": "", "order": 4},
        ]

        for data in lapsos:
            lapso, created = Lapso.objects.get_or_create(
                slug=data["slug"],
                defaults=data,
            )
            status = "✅ Creado" if created else "⏭️  Ya existe"
            self.stdout.write(f"  {status}: {lapso.title}")

        self.stdout.write(self.style.SUCCESS("\n¡Lapsos listos!"))
