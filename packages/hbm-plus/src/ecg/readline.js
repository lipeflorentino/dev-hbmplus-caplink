const readline = require('readline');
const { sendEcg } = require('./sendEcg');

function readComands() {
    // Configurar readline para aceitar comandos do terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        const [command, param1, param2, param3] = input.split(' ');

        console.log({ command, param1, param2, param3 });

        if (command === 'ecg') {
            const deviceId = param1;
            const milivolts = parseFloat(param2);
            const interval = parseInt(param3);

            if (!isNaN(milivolts)) {
                console.log(`Sending ECG: ${milivolts} with interval `);
                sendEcg(deviceId, milivolts, interval);
            } else {
                console.log('Invalid milivolts value. Please provide a number.');
            }
        } else {
            console.log('Unknown command. Available commands: sendEcg <milivolts>');
        }
    });
}

module.exports = {
    readComands,
}
