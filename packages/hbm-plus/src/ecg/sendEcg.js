const axios = require('axios');

async function sendEcg(deviceId, milivolts, interval) {
    try {
        const response = await axios.post(
            'https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg',
            {
                ecgData: { deviceId, milivolts, interval }
            });

        console.log('ECG sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending ECG:', error);
    }
};

module.exports = {
    sendEcg,
}
