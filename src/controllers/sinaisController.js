// src/controllers/sinaisController.js
const fs = require('fs');
const path = require('path');
const { logEvent } = require('../utils/logger');
const { computeOver15ASignals } = require('../services/analisetipsService');

function loadRawCopa() {
  const rawPath = path.join(__dirname, '..', 'data', 'raw-copa.json');
  const content = fs.readFileSync(rawPath, 'utf8');
  return JSON.parse(content);
}

// GET /api/matrix/copa/raw
function getRawCopa(req, res) {
  try {
    const raw = loadRawCopa();
    res.json(raw);
  } catch (err) {
    console.error('Erro ao carregar raw-copa.json:', err.message);
    res.status(500).json({ error: true, message: 'Erro ao carregar dados da Copa.' });
  }
}

// GET /api/sinais/over15a
function getOver15A(req, res) {
  try {
    const raw = loadRawCopa();
    const result = computeOver15ASignals(raw);
    logEvent('SIGNAL_GENERATED', {
      strategy: result.strategy,
      liga: result.liga,
      signals: result.signals,
    });
    res.json(result);
  } catch (err) {
    console.error('Erro ao calcular OVER 1.5 A:', err.message);
    res.status(500).json({ error: true, message: 'Erro ao calcular sinais OVER 1.5.' });
  }
}

module.exports = {
  getRawCopa,
  getOver15A,
};
