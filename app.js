require('dotenv').config();

const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conexión a MongoDB
connectDB();

// Configuración de Handlebars
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secreto_temporal',
    resave: false,
    saveUninitialized: false
  })
);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Variables globales para las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Ruta principal temporal
app.get('/', (req, res) => {
  res.render('products/index', {
    title: 'MiInventarioExpress',
    products: []
  });
});

// Configuración inicial de Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado al chat');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado del chat');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});