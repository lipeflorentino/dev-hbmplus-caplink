const readline = require('readline');
const { sendEcg } = require('./sendEcg');
const logger = require('../logger/logger');

function readComands(server) {
    // Configurar readline para aceitar comandos do terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        const [command, param1, param2, param3] = input.split(' ');
        const deviceId = param1;
        const milivolts = parseFloat(param2);
        const interval = parseInt(param3);

        if (command === 'ecg') {
            if (!isNaN(milivolts)) {
                logger.info(`Sending ECG to device ${deviceId}: milivolts ${milivolts} with interval ${interval}`);
                sendEcg(deviceId, milivolts, interval);
            } else {
                logger.info('Invalid milivolts value. Please provide a number.');
            }
        } else if (command === 'quit') {
            server.close(() => {
                logger.info('server was shut down...');
                process.exit(0);
            });
        } else if (command === 'simulator') {
            console.log('running simulator');
            setInterval(() => {
                sendEcg(deviceId, milivolts, interval);
            }, 30000);
        } else {
            logger.info('Unknown command. Available commands: sendEcg <milivolts>');
        }
    });
}

module.exports = {
    readComands,
}
