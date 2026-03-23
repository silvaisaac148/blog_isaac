# Blog Portafolio — Gerencia y Mercadeo

Blog personal universitario construido con **Django + DRF** (backend), **React + Vite** (frontend), y **PostgreSQL**.

---

## 📂 Estructura del Proyecto

```
blog_isaac/
├── backend/           → Django API (Python)
│   ├── config/        → Settings, URLs, WSGI
│   ├── blog/          → Modelos, Serializers, Views, Admin
│   ├── manage.py
│   ├── requirements.txt
│   └── app.yaml       → Config de App Engine (backend)
├── frontend/          → React SPA (Vite)
│   ├── src/
│   │   ├── pages/     → Presentacion, LapsoPage, PostDetail
│   │   ├── components/→ Navbar, PostCard, MediaGallery, Footer
│   │   └── services/  → API client (Axios)
│   ├── package.json
│   └── app.yaml       → Config de App Engine (frontend)
└── README.md
```

---

## 🚀 Setup Local (Desarrollo)

### 1. Backend (Django)

```bash
# Crear y activar entorno virtual
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno (crear archivo .env)
# DB_NAME=blog_isaac
# DB_USER=postgres
# DB_PASSWORD=tu_password
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DJANGO_SECRET_KEY=tu-clave-secreta-aqui
# DJANGO_DEBUG=True

# Ejecutar migraciones
python manage.py makemigrations blog
python manage.py migrate

# Crear los 5 Lapsos iniciales
python manage.py seed_lapsos

# Crear superusuario para el panel admin
python manage.py createsuperuser

# Iniciar el servidor
python manage.py runserver
```

Backend disponible en: `http://localhost:8000`
Panel admin: `http://localhost:8000/admin/`
API: `http://localhost:8000/api/lapsos/`

### 2. Frontend (React)

```bash
# En otra terminal
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Frontend disponible en: `http://localhost:5173`

---

## ☁️ Despliegue en Producción (Railway & Vercel)

Hemos configurado el proyecto para que el backend se despliegue en **Railway** (junto con su base de datos) y el frontend en **Vercel**.

### Paso 1: Preparar el Repositorio GitHub

```bash
# En la raíz del proyecto (blog_isaac)
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Asocia tu repositorio de GitHub y haz push
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 2: Backend (Railway)

1. Ve a [Railway.app](https://railway.app) y crea una cuenta.
2. Crea un **New Project** → **Deploy from GitHub repo** → Selecciona tu repositorio.
3. **Crea la Base de Datos:** En el mismo proyecto, haz clic en **New** → **Database** → **Add PostgreSQL**.
4. **Configurar Variables de Entorno (Backend):**
   Selecciona el servicio de tu backend (código fuente), ve a la pestaña **Variables** y agrega:
   - `DJANGO_SECRET_KEY`: Una clave secreta segura y única.
   - `DJANGO_DEBUG`: `False`
   - `DJANGO_ALLOWED_HOSTS`: `tu-dominio-backend.up.railway.app`
   - `CORS_ALLOWED_ORIGINS`: `https://tu-dominio-frontend.vercel.app`
   - *Nota: Railway te permite auto-completar las credenciales de la base de datos (DB_URL).* Deberás configurar estas manualmente en Railway agregando `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` mirando las variables que generó tu base de datos PostgreSQL de Railway.
5. **Comando de Inicio:**
   Vuelve a la pestaña **Settings** del backend. En la sección **Deploy**, asegúrate de que el *Start Command* sea:
   `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi --bind 0.0.0.0:$PORT`
6. **Generar Dominio:**
   En la pestaña **Settings** bajo **Networking**, haz clic en *Generate Domain*.

### Paso 3: Frontend (Vercel)

1. Ve a [Vercel.com](https://vercel.com) y crea una cuenta con GitHub.
2. Haz clic en **Add New Project** y selecciona tu repositorio.
3. En la configuración del proyecto:
   - **Framework Preset**: Vercel detectará "Vite" automáticamente.
   - **Root Directory**: Escribe `frontend` (importante, ya que el código de React está dentro de la carpeta frontend).
   - **Environment Variables**:
     - Nombre: `VITE_API_URL`
     - Valor: `https://tu-dominio-backend.up.railway.app` (El dominio que generaste en el paso anterior en Railway).
4. Haz clic en **Deploy**.

### Paso 4: Configuración Final en Producción

1. Abre la terminal de comandos de tu servicio backend en Railway.
2. Crea tu usuario administrador de producción:
   `python manage.py createsuperuser`
3. Si lo deseas, puedes correr el seed de lapsos:
   `python manage.py seed_lapsos`

---

## 🌐 Configuración de Dominio Personalizado

Tanto Vercel como Railway proveen documentación muy sencilla si decides comprar un dominio (ej. `miportafolio.com`).

1. **En Vercel (Frontend):** Settings → Domains → Add tu dominio. Te pedirá agregar un registro `A` o `CNAME` en tu proveedor.
2. **En Railway (Backend API):** Puedes usar el dominio gratuito que te proporcionan o, si lo deseas, configurar un subdominio (ej. `api.miportafolio.com`) en Settings → Networking → Custom Domain.

---

## 📝 Uso del Panel Admin

1. Acceder a `/admin/` con tu superusuario
2. **Lapsos** ya están creados (Presentación, Lapso 1-4)
3. **Crear publicaciones**: Click en Publicaciones → Agregar → Seleccionar Lapso, escribir contenido con el editor enriquecido
4. **Subir multimedia**: Dentro de cada publicación, usar los campos inline para adjuntar imágenes, videos o documentos
5. **Marcar como publicado**: Activar el checkbox "Publicado" para que aparezca en el frontend

---

## 🛡️ Seguridad en Producción

- [ ] Cambiar `DJANGO_SECRET_KEY` a un valor seguro y único
- [ ] Establecer `DJANGO_DEBUG=False`
- [ ] Configurar `ALLOWED_HOSTS` con tu dominio
- [ ] Configurar `CORS_ALLOWED_ORIGINS` con la URL de tu frontend
- [ ] Usar Google Secret Manager para credenciales sensibles
- [ ] Habilitar HTTPS (automático con App Engine)
