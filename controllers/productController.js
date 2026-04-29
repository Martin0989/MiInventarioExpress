const { validationResult } = require('express-validator');
const Product = require('../models/Product');

const productController = {
  listarProductos: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).lean();

      res.render('products/index', {
        title: 'Productos',
        products
      });
    } catch (error) {
      res.render('products/index', {
        title: 'Productos',
        products: [],
        error: 'No se pudieron cargar los productos. Verifica la conexión con MongoDB.'
      });
    }
  },

  mostrarFormularioCrear: (req, res) => {
    res.render('products/create', {
      title: 'Crear producto'
    });
  },

  crearProducto: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('products/create', {
        title: 'Crear producto',
        errors: errors.array(),
        values: req.body
      });
    }

    try {
      const { nombre, precio, descripcion } = req.body;

      await Product.create({
        nombre,
        precio,
        descripcion,
        imagen: req.file ? req.file.filename : ''
      });

      res.redirect('/');
    } catch (error) {
      res.render('products/create', {
        title: 'Crear producto',
        error: 'No se pudo crear el producto.',
        values: req.body
      });
    }
  },

  mostrarFormularioEditar: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).lean();

      if (!product) {
        return res.redirect('/');
      }

      res.render('products/edit', {
        title: 'Editar producto',
        product
      });
    } catch (error) {
      res.redirect('/');
    }
  },

  actualizarProducto: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const product = {
        _id: req.params.id,
        ...req.body
      };

      return res.render('products/edit', {
        title: 'Editar producto',
        errors: errors.array(),
        product
      });
    }

    try {
      const { nombre, precio, descripcion } = req.body;

      const data = {
        nombre,
        precio,
        descripcion
      };

      if (req.file) {
        data.imagen = req.file.filename;
      }

      await Product.findByIdAndUpdate(req.params.id, data);

      res.redirect('/');
    } catch (error) {
      res.redirect('/');
    }
  },

  eliminarProducto: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/');
    } catch (error) {
      res.redirect('/');
    }
  }
};

module.exports = productController;