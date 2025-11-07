# 🐾 AdoptMe API

API REST para la gestión de adopciones de mascotas.  
Construida con **Node.js**, **Express**, **MongoDB**, y **Swagger** para documentación interactiva.  
Incluye estructura modular, pruebas con **Mocha/Chai/Supertest**, y soporte para **Docker**.

---

## 🚀 Características principales

- CRUD completo de **usuarios**, **mascotas** y **adopciones**.
- Carga de imágenes mediante **Multer**.
- Documentación automática con **Swagger**.
- Logs de aplicación centralizados con **Winston**.
- Conexión a base de datos **MongoDB Atlas**.
- Arquitectura limpia basada en capas:
  - **Controller → Service → Repository → DAO**
- Configurable por entorno (`.env`).
- Test funcionales con **Mocha + Chai + Supertest**.
- Preparado para despliegue con **Docker** y **docker-compose**.

---

## 📦 Imagen en Docker Hub

La imagen pública del proyecto está disponible en Docker Hub:  
👉 [https://hub.docker.com/repository/docker/mariomedina/adoptme-api](https://hub.docker.com/repository/docker/mariomedina/adoptme-api)

### 🔹 Descargar la imagen

```bash
docker pull mariomedina/adoptme-api:v1.0
```

### 🔹 Ejecutar el contenedor

```bash
docker run -d -p 8085:8085 --name adoptme-api mariomedina/adoptme-api:v1.0
```

El servicio estará disponible en:  
👉 **http://localhost:8085**

También puedes usar `docker-compose` (ver más abajo).

---

## 📁 Estructura del proyecto

```
src/
 ├── app.js                  # Punto de entrada de la app
 ├── config/                 # Configuración general y Swagger
 ├── controllers/            # Lógica de endpoints
 ├── dao/                    # Acceso directo a MongoDB (Mongoose)
 │    └── models/            # Modelos de base de datos
 ├── db/                     # Conexión a MongoDB
 ├── dto/                    # Data Transfer Objects
 ├── docs/                   # Archivos Swagger YAML
 ├── logs/                   # Configuración de Winston + logs generados
 ├── mocks/                  # Datos mock para pruebas
 ├── public/img/             # Carpeta para imágenes de mascotas
 ├── repository/             # Repositorios de acceso a datos
 ├── routes/                 # Rutas principales del API
 ├── services/               # Lógica de negocio
 └── utils/                  # Funciones utilitarias (e.g., uploader)
```

---

## ⚙️ Configuración de entorno

Archivo `.env`:

```env
MONGODB_URI = mongodb+srv://<usuario>:<password>@clustersandbox.xbwdj.mongodb.net/AdoptMe?retryWrites=true&w=majority
PORT = 8085
NODE_ENV = development
```

---

## 🐳 Despliegue con Docker Compose

### 1️⃣ Construir y levantar el contenedor

```bash
docker-compose up --build
```

El servicio se expondrá en:  
👉 **http://localhost:8085**

### 2️⃣ Archivos clave

**Dockerfile**
```dockerfile
FROM node:20.12.2
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/logs
EXPOSE 8085
CMD ["node", "src/app.js"]
```

**docker-compose.yml**
```yaml
version: "3.9"
services:
  api:
    build: .
    container_name: adoptme-api-v1
    ports:
      - "8085:8085"
    env_file:
      - .env
    volumes:
      - ./:/app
```

---

## 🧠 Documentación API

Una vez levantado el servidor, accede a:  
📄 **http://localhost:8085/api-docs**

Los archivos YAML se encuentran en `src/docs/`:
- `users.yaml`
- `pets.yaml`
- `adoptions.yaml`

---

## 🔍 Testing

Los test funcionales están en la carpeta `test/`.

Ejecutar pruebas:
```bash
npm test
```

Incluye pruebas para endpoints de **Users**, **Pets** y **Adoptions** usando **Mocha**, **Chai** y **Supertest**.

---

## 🪵 Logging

El sistema usa **Winston** configurado en `src/logs/logger.js`.

Los logs se guardan en:
```
src/logs/app.log
```

Ejemplo de salida:
```
[2025-11-06 21:30:14] [info]: Server listening on port 3031
[2025-11-06 21:31:22] [error]: Incomplete values at createPetWithImage
```

---

## 🧱 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|--------------|
| GET | `/api/users` | Listar usuarios |
| POST | `/api/users` | Crear usuario |
| GET | `/api/pets` | Listar mascotas |
| POST | `/api/pets/withimage` | Crear mascota con imagen |
| GET | `/api/adoptions` | Listar adopciones |
| POST | `/api/adoptions` | Crear adopción |
| GET | `/api/mocks/pets` | Obtener datos mock de mascotas |

---

## 🧰 Scripts disponibles

```bash
npm start      # Inicia el servidor
npm run dev    # Inicia con nodemon
npm test       # Ejecuta pruebas con Mocha/Chai
```

---

## 🧑‍💻 Autor

**Mario Medina**  
Proyecto personal de backend con fines educativos y de práctica.
