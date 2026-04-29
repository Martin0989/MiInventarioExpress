const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.mostrarLogin);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Ingrese un correo electrónico válido.'),
    body('password')
      .notEmpty()
      .withMessage('La contraseña es obligatoria.')
  ],
  authController.iniciarSesion
);

router.get('/register', authController.mostrarRegistro);

router.post(
  '/register',
  [
    body('nombre')
      .notEmpty()
      .withMessage('El nombre es obligatorio.')
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres.'),
    body('email')
      .isEmail()
      .withMessage('Ingrese un correo electrónico válido.'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres.')
  ],
  authController.registrarUsuario
);

router.get('/logout', authController.cerrarSesion);

module.exports = router;