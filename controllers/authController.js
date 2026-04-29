const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const authController = {
  mostrarLogin: (req, res) => {
    res.render('auth/login', {
      title: 'Iniciar sesión'
    });
  },

  mostrarRegistro: (req, res) => {
    res.render('auth/register', {
      title: 'Registrarse'
    });
  },

  registrarUsuario: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('auth/register', {
        title: 'Registrarse',
        errors: errors.array(),
        values: req.body
      });
    }

    try {
      const { nombre, email, password } = req.body;

      const existeUsuario = await User.findOne({ email });

      if (existeUsuario) {
        return res.render('auth/register', {
          title: 'Registrarse',
          error: 'El correo electrónico ya está registrado.',
          values: req.body
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      await User.create({
        nombre,
        email,
        password: passwordHash
      });

      res.redirect('/login');
    } catch (error) {
      res.render('auth/register', {
        title: 'Registrarse',
        error: 'No se pudo registrar el usuario.',
        values: req.body
      });
    }
  },

  iniciarSesion: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('auth/login', {
        title: 'Iniciar sesión',
        errors: errors.array(),
        values: req.body
      });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.render('auth/login', {
          title: 'Iniciar sesión',
          error: 'Correo o contraseña incorrectos.',
          values: req.body
        });
      }

      const passwordCorrecto = await bcrypt.compare(password, user.password);

      if (!passwordCorrecto) {
        return res.render('auth/login', {
          title: 'Iniciar sesión',
          error: 'Correo o contraseña incorrectos.',
          values: req.body
        });
      }

      req.session.user = {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      };

      res.redirect('/');
    } catch (error) {
      res.render('auth/login', {
        title: 'Iniciar sesión',
        error: 'No se pudo iniciar sesión.',
        values: req.body
      });
    }
  },

  cerrarSesion: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};

module.exports = authController;