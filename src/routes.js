// src/routes.js
const express = require('express');
const router = express.Router();
const sinaisController = require('./controllers/sinaisController');

// Sinais da estratégia OVER 1.5 - Opção A
router.get('/sinais/over15a', sinaisController.getOver15A);

// Retorna a matriz crua (JSON direto do AnaliseTips já salvo em arquivo)
router.get('/matrix/copa/raw', sinaisController.getRawCopa);

// Ping/log simples
router.get('/ping', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

module.exports = router;
