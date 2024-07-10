const express = require('express');
const { receiveSignal } = require('./src/ecg/receiveSignal');
const { readComands } = require('./src/ecg/readline');
const { sendLogs } = require('./src/logger/sendLogs');
const logger = require('./src/logger/logger');

const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
});

// Endpoint para receber o sinal
app.post('/receive-signal', receiveSignal);
// Serve the logs in an HTML page
app.get('/logs', sendLogs);

readComands();

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
    logger.info('Type "sendEcg <milivolts>" to send an ECG signal.');
});
