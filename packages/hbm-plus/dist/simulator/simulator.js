"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSimulator = startSimulator;
const axios_1 = require("axios");
function calculateY(x) {
    const y = -0.06366
        + 0.12613 * Math.cos(Math.PI * x / 500)
        + 0.12258 * Math.cos(Math.PI * x / 250)
        + 0.01593 * Math.sin(Math.PI * x / 500)
        + 0.03147 * Math.sin(Math.PI * x / 250);
    const randomFactor = 0.8 + Math.random() * 0.4;
    const modifiedY = y * randomFactor;
    return modifiedY;
}
;
function startSimulator(interval) {
    setInterval(() => {
        const data = {
            deviceId: 'device-123',
            milivolts: calculateY(interval),
            interval,
        };
        console.log(data);
        axios_1.default.post('https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg', { ecgData: data })
            .then(response => {
            console.log('Data sent successfully:', response.data);
        })
            .catch(error => {
            console.error('Error sending data:', error);
        });
    }, interval * 1000);
}
//# sourceMappingURL=simulator.js.map