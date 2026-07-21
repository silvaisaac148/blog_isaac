"""
Crea o actualiza un superusuario a partir de variables de entorno.
Idempotente: si el usuario ya existe, actualiza su contraseña y permisos.
No hace nada si las variables no estan definidas (no rompe el arranque).

Variables:
  DJANGO_SUPERUSER_USERNAME
  DJANGO_SUPERUSER_EMAIL      (opcional)
  DJANGO_SUPERUSER_PASSWORD
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Crea o actualiza un superusuario desde variables de entorno."

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")

        if not username or not password:
            self.stdout.write(
                "ensure_superuser: variables no definidas, se omite."
            )
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(username=username)
        user.email = email or user.email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        verbo = "creado" if created else "actualizado"
        self.stdout.write(
            self.style.SUCCESS(f"ensure_superuser: usuario '{username}' {verbo}.")
        )
