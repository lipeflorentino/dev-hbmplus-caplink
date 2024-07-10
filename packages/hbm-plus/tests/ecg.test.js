const { sendEcg } = require('../src/ecg/sendEcg');
const { receiveSignal } = require('../src/ecg/receiveSignal');
const { readComands } = require('../src/ecg/readline');
const axios = require('axios');

jest.mock('axios');
const mockedAxios = axios;

describe('sendEcg', () => {
    it('should send ECG and return response data', async () => {
        const responseData = { success: true };
        mockedAxios.post.mockResolvedValue({ data: responseData });

        const result = await sendEcg('device-1', 1.5, 30);
        expect(result).toEqual(responseData);
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg',
            {
                ecgData: {
                    deviceId: 'device-1',
                    milivolts: 1.5,
                    interval: 30,
                },
            },
        );
    });

    it('should throw an error when sending ECG fails', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Error'));

        await expect(sendEcg('device-1', 1.5, 30)).rejects.toThrow('Error sending ECG');
    });
});

describe('readComands', () => {
    it('should be defined', async () => {
        expect(readComands).toBeDefined();
    });
});

describe('receive signal', () => {
    it('should be defined', async () => {
        expect(receiveSignal).toBeDefined();
    });

    it('should be bip', async () => {
        expect(receiveSignal(
            { body: { signal: 'bip' } },
            {
                status: (code) => {
                    return {
                        json: () => "Success" + code,
                    }
                }
            }
        )).toBe('Signal received: bip');
    });

    it('should be bipbip', async () => {
        expect(receiveSignal(
            { body: { signal: 'bipbip' } },
            {
                status: (code) => {
                    return {
                        json: () => "Success" + code,
                    }
                }
            }
        )).toBe('Signal received: bipbip');
    });
});
