const express = require('express');
const { receiveSignal } = require('./src/ecg/receiveSignal');
const { readComands } = require('./src/ecg/readline');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint para receber o sinal
app.post('/receive-signal', receiveSignal);

readComands();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log('Type "sendEcg <milivolts>" to send an ECG signal.');
});
