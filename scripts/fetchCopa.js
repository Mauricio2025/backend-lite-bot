// scripts/fetchCopa.js
// Script para buscar a tabela da Copa (Bet365) do AnaliseTips
// e salvar em src/data/raw-copa.json

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BASE_URL = process.env.ANALISETIPS_BASE_URL || 'https://robots.analisetips.com';
const TOKEN = process.env.ANALISETIPS_TOKEN;
const LEAGUE = process.env.DEFAULT_LEAGUE || 'copa';

if (!TOKEN) {
  console.error('ERRO: ANALISETIPS_TOKEN não definido no .env');
  process.exit(1);
}

async function main() {
  try {
    const url = `${BASE_URL}/api/tabela`;
    const params = {
      bet: '365',
      league: LEAGUE,
      page: 1,
      rows: 20,
      method: 'resultsBoth',
    };

    console.log('Buscando dados da liga:', LEAGUE);
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json',
      },
    });

    console.log('STATUS:', response.status);

    const rawPath = path.join(__dirname, '..', 'src', 'data', 'raw-copa.json');
    fs.writeFileSync(rawPath, JSON.stringify(response.data, null, 2), {
      encoding: 'utf8',
    });

    console.log('\nArquivo salvo em:');
    console.log(rawPath);
    console.log('\nDados capturados com sucesso!');
  } catch (err) {
    console.error('Erro ao buscar dados da Copa:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data);
    }
    process.exit(1);
  }
}

main();
