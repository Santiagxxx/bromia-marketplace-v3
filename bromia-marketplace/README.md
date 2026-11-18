# 🍫 Bromia Marketplace — Repostería Artesanal

Plataforma web tipo marketplace para **Bromia** (`@bromiaoficial`), diseñada con su identidad visual oficial (paleta lavanda pastel `#F2D9FA`, marrón chocolate `#5D3228`, acentos fresa/maracuyá y estética inspirada en sus publicaciones), **sin fricción de login** y con **cierre de compra directo vía WhatsApp**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una **arquitectura desacoplada Full-Stack** dividida en dos aplicaciones independientes:

```text
bromia-marketplace/
├── backend/                     # API REST en Java 17 + Spring Boot 3.3 (Arquitectura en Capas)
│   └── src/main/java/com/bromia/marketplace/
│       ├── config/              # CORS y DataSeeder (catálogo inicial de Bromia)
│       ├── controller/          # Controladores REST (/api/v1/products, /categories, /config, /admin)
│       ├── domain/              # Entidades JPA (Product, Category, StoreConfig) y Enums
│       ├── dto/                 # Contratos de entrada/salida (RequestDTO / ResponseDTO)
│       ├── exception/           # Manejo global de errores (@RestControllerAdvice)
│       ├── mapper/              # Transformación limpia entre Entidades y DTOs
│       ├── repository/          # Persistencia con Spring Data JPA + H2
│       └── service/             # Lógica de negocio e interfaces de servicio
│
├── frontend/                    # SPA moderna en Vue 3 + Vite + Tailwind CSS + Pinia
│   └── src/
│       ├── assets/              # CSS global, animaciones y logo vectorial oficial (bromia-logo.svg)
│       ├── components/          # Componentes modulares (common, store, admin)
│       ├── router/              # Rutas públicas: '/' (Tienda) y '/admin' (Dashboard sin login)
│       ├── services/            # Cliente HTTP Axios con fallback resiliente
│       ├── stores/              # Estado global reactivo con Pinia (Catálogo, Carrito, Config)
│       ├── utils/               # Formateadores de moneda COP y constructor de enlaces WhatsApp
│       └── views/               # Vistas principales (MarketplaceView, AdminDashboardView)
│
├── iniciar-backend.sh           # Script rápido para arrancar Spring Boot (Linux/Mac)
├── iniciar-frontend.sh          # Script rápido para arrancar Vue + Vite (Linux/Mac)
└── docker-compose.yml           # Despliegue contenedorizado con un solo comando
```

---

## 🚀 Cómo ejecutar el proyecto en local

### 1. Backend (Java 17+ & Maven)
```bash
cd backend
mvn spring-boot:run
```
- **API REST disponible en:** `http://localhost:8080/api/v1/products`
- **Documentación interactiva Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **Consola Base de Datos H2:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/bromiadb`, User: `sa`, Password: *(vacío)*)

### 2. Frontend (Node.js 18+ & Vue 3)
```bash
cd frontend
npm install
npm run dev
```
- **Tienda Marketplace:** `http://localhost:5173/`
- **Dashboard Admin (Acceso directo sin login):** `http://localhost:5173/admin`

### 3. Ejecución rápida con Docker Compose
```bash
docker-compose up --build
```
