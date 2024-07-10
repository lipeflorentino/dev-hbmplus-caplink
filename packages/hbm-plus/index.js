const express = require('express');
const { receiveSignal } = require('./src/ecg/receiveSignal');
const { readComands } = require('./src/ecg/readline');
const { sendLogs } = require('./src/logger/sendLogs');
const logger = require('./src/logger/logger');

const app = express();
const port = 3000;
const host = '0.0.0.0';

app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
});
app.post('/receive-signal', receiveSignal);
app.get('/logs', sendLogs);

const server = app.listen(port, host, () => {
    logger.info(`Server running on http://${host}:${port}`);
    logger.info('Type "sendEcg <milivolts>" to send an ECG signal.');
});

readComands(server);
