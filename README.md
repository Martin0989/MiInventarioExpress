# MiInventarioExpress

## Datos del estudiante

- Nombre: Martin Ortiz
- Asignatura: Aplicaciones Web
- Unidad: Unidad 2 - Programación del lado del servidor
- Universidad: Universidad Politécnica Salesiana

## Repositorio de GitHub

URL del repositorio:

https://github.com/Martin0989/MiInventarioExpress

## Descripción del proyecto

MiInventarioExpress es una aplicación web desarrollada con Node.js, Express y MongoDB para la gestión de productos.

La aplicación permite registrar, consultar, actualizar y eliminar productos. Además, incluye autenticación de usuarios, manejo de sesiones, carga de imágenes para productos y un módulo de chat en tiempo real entre usuarios autenticados.

Este proyecto fue desarrollado como parte de la actividad de la Unidad 2 de la asignatura Aplicaciones Web.

## Objetivo del proyecto

Desarrollar una aplicación web funcional y segura utilizando Node.js, Express, MongoDB y Socket.io, aplicando conceptos de programación del lado del servidor, operaciones HTTP, persistencia de datos, manejo de archivos, sesiones y comunicación en tiempo real.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Handlebars
- Multer
- Express-session
- Bcrypt
- Express-validator
- Socket.io
- Dotenv
- Nodemon

## Funcionalidades implementadas

- Estructura de carpetas organizada bajo el patrón MVC.
- Configuración básica del proyecto con npm.
- Archivo `.gitignore`.
- Conexión con MongoDB mediante Mongoose.
- Modelo de producto con los campos:
  - Nombre
  - Precio
  - Descripción
  - Imagen
- CRUD completo de productos:
  - Crear productos
  - Listar productos
  - Editar productos
  - Eliminar productos
- Carga de imágenes de productos usando Multer.
- Validación de tipo de archivo de imagen:
  - JPG
  - JPEG
  - PNG
  - WEBP
- Validación de tamaño máximo para imágenes.
- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Manejo de sesiones con express-session.
- Contraseñas cifradas usando bcrypt.
- Validaciones de formularios con express-validator.
- Control de errores para datos inválidos.
- Vistas dinámicas con Handlebars.
- Página de login.
- Página de registro.
- Página de listado de productos.
- Formulario de creación de productos.
- Formulario de edición de productos.
- Módulo de chat en tiempo real usando Socket.io.
- Protección de rutas para usuarios autenticados.
- Archivos estáticos organizados en la carpeta `public`.
- Carpeta `uploads` para almacenar imágenes de productos.

## Estructura del proyecto

```text
MiInventarioExpress/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── productController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   ├── Product.js
│   └── User.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── chat.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   └── productRoutes.js
│
├── uploads/
│   └── .gitkeep
│
├── views/
│   ├── auth/
│   │   ├── login.handlebars
│   │   └── register.handlebars
│   ├── chat/
│   │   └── index.handlebars
│   ├── layouts/
│   │   └── main.handlebars
│   └── products/
│       ├── create.handlebars
│       ├── edit.handlebars
│       └── index.handlebars
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── readme.txt