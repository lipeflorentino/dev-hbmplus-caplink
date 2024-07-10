const axios = require('axios');
const logger = require('../logger/logger');

async function sendEcg(deviceId, milivolts, interval) {
    try {
        const response = await axios.post(
            'https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg',
            {
                ecgData: { deviceId, milivolts, interval }
            });

        logger.info('ECG sent successfully:', { data: response.data });
        return response.data;
    } catch (error) {
        logger.info('Error sending ECG:', { error });
        throw new Error('Error sending ECG');
    }
};

module.exports = {
    sendEcg,
}
