// src/index.js
// ==============================================
// BACKEND LITE - BOT DE SINAIS FUTEBOL VIRTUAL
// Estratégia fixa: OVER 1.5 (Opção A)
// Fonte de dados: AnaliseTips (tabela Copa Bet365)
// ==============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { logEvent } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend-lite-bot' });
});

// Rotas da API
app.use('/api', routes);

app.listen(PORT, () => {
  console.log('==============================================');
  console.log(' BACKEND LITE - BOT DE SINAIS FUTEBOL VIRTUAL ');
  console.log('==============================================');
  console.log(' Ambiente:', process.env.NODE_ENV || 'development');
  console.log(' Porta:   ', PORT);
  console.log('==============================================');
  logEvent('SERVER_START', { port: String(PORT) });
});
