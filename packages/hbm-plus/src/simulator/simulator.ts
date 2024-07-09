import axios from 'axios';

function generateEcgData() {
    // Simular dados de ECG
    return {
        milivolts: Math.random() * 2,
        deviceId: 'device-123',
        isRegular: Math.random() > 0.8 ? false : true,
    };
}

function sendEcgData() {
    const data = generateEcgData();

    axios.post('https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg', { data })
        .then(response => {
            console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
}

export function startSimulator(x: number) {
    setInterval(sendEcgData, x * 1000); // Enviar dados a cada segundo
}
