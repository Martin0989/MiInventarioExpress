const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const productController = require('../controllers/productController');
const protegerRuta = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nombreArchivo = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, nombreArchivo);
  }
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp/;
  const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const mimeValido = tiposPermitidos.test(file.mimetype);

  if (extensionValida && mimeValido) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPG, PNG o WEBP.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

const validarProducto = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio.')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres.'),
  body('precio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0.'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria.')
    .isLength({ min: 5 })
    .withMessage('La descripción debe tener al menos 5 caracteres.')
];

router.get('/', productController.listarProductos);

router.get('/products/create', protegerRuta, productController.mostrarFormularioCrear);

router.post(
  '/products/create',
  protegerRuta,
  upload.single('imagen'),
  validarProducto,
  productController.crearProducto
);

router.get('/products/edit/:id', protegerRuta, productController.mostrarFormularioEditar);

router.post(
  '/products/edit/:id',
  protegerRuta,
  upload.single('imagen'),
  validarProducto,
  productController.actualizarProducto
);

router.post('/products/delete/:id', protegerRuta, productController.eliminarProducto);

module.exports = router;