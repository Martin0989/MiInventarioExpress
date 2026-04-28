const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.listarProductos);

router.get('/products/create', productController.mostrarFormularioCrear);

router.post('/products/create', productController.crearProducto);

router.get('/products/edit/:id', productController.mostrarFormularioEditar);

router.post('/products/edit/:id', productController.actualizarProducto);

router.post('/products/delete/:id', productController.eliminarProducto);

module.exports = router;