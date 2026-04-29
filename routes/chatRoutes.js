const express = require('express');
const protegerRuta = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/chat', protegerRuta, (req, res) => {
  res.render('chat/index', {
    title: 'Chat en tiempo real'
  });
});

module.exports = router;