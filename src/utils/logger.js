// src/utils/logger.js
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'events.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function logEvent(type, payload = {}) {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    type,
    ...payload,
  }) + '\n';

  try {
    fs.appendFileSync(LOG_FILE, line, { encoding: 'utf8' });
  } catch (err) {
    console.error('Erro ao gravar log:', err.message);
  }

  // Também joga no console (útil em dev)
  console.log(line.trim());
}

module.exports = { logEvent };
