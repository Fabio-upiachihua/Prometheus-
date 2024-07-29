const express = require('express');
const axios = require('axios');
const client = require('prom-client');

const app = express();
const port = 8080;  // Puerto para el servidor del exportador

// Crea un registro de métricas
const registry = new client.Registry();

// Crea un contador de ejemplo
const exampleMetric = new client.Gauge({
  name: 'example_metric',
  help: 'An example metric',
  labelNames: ['label'],
});
registry.registerMetric(exampleMetric);

app.get('/metrics', async (req, res) => {
  try {
    // Solicita datos desde tu API
    const response = await axios.get('https://lobby-bff.apiusoft.com/actuator/metrics');
    const data = response.data;

    // Actualiza las métricas
    exampleMetric.set({ label: 'example' }, data.names.length);

    res.set('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).send('Error fetching metrics');
  }
});

app.listen(port, () => {
  console.log(`Exporter running at http://localhost:${port}/metrics`);
});
