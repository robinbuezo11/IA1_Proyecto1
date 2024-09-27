const express = require('express');
const { holamundo, chat } = require('../js/prolog');

const router = express.Router();

// Ruta para mover el mouse
router.get('/', holamundo);
router.post('/chat', chat);

module.exports = router;