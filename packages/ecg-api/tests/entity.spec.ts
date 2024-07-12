import { ECG } from "../domain/entities/ECG.entity";

const params = {
    deviceId: '1',
    milivolts: 0.2,
    interval: 30,
}

const ecg = new ECG(params.deviceId, params.milivolts, params.interval);

describe('entity tests', () => {
    it('is defined', () => {
        expect(ECG).toBeDefined();
        expect(ecg).toBeDefined();
        expect(ecg.detectIrregularities).toBeDefined();
        expect(ecg.externalRoute).toBeDefined();
        expect(ecg.localRoute).toBeDefined();
        expect(ecg.setIsRegular).toBeDefined();
        expect(ecg.setBippedAt).toBeDefined();
        expect(ecg.setUnBippedAt).toBeDefined();
    });

    it('setted params', () => {
        expect(ecg.deviceId).toBe('1');
        expect(ecg.milivolts).toBe(0.2);
        expect(ecg.interval).toBe(30);
    });

    it('setIsRegular', () => {
        ecg.setIsRegular(true)
        expect(ecg.isRegular).toBeTruthy();
    });

    it('setBippedAt', () => {
        const date = new Date().toISOString();
        ecg.setBippedAt(date)
        expect(ecg.bippedAt).toBe(date);
    });

    it('setUnBippedAt', () => {
        const date = new Date().toISOString();
        ecg.setUnBippedAt(date)
        expect(ecg.unBippedAt).toBe(date);
    });

    it('detectIrregularities', () => {
        ecg.detectIrregularities();
        expect(ecg.isRegular).toBeTruthy();
    });
});