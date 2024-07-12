import { ECGRepository } from "../domain/repositories/ECGRepository.interface";
import { AxiosAdapter } from "../domain/adapter/axios.interface";
import { ECG } from "../domain/entities/ECG.entity";

export class Axios implements AxiosAdapter {
    async post(url: string, data: { signal: string }): Promise<any> {
        console.log('enviado com sucesso!', { url, data });
        return 'Ok';
    };
}

export class Repository implements ECGRepository {
    async save(ecg: ECG): Promise<void> {
        console.log('salvo com sucesso!', { ecg });
    };
    async update(keys: { id: string, createdAt: string }, params: Partial<ECG>): Promise<void> {
        console.log('atualizado com sucesso!', { keys, params });
    };
    async listEntries(deviceId: string, interval?: string): Promise<ECG[]> {
        return [new ECG(deviceId, 0.2, Number(interval) || 30)];
    };
    async listIrregulaties(deviceId: string): Promise<ECG[]> {
        return [new ECG(deviceId, 0.2, 30)]
    };
    async instabilityCheck(deviceId: string): Promise<any[]> {
        if (deviceId === '2') {
            const entries = [];
            for (let i = 0; i <= 59; i++) {
                entries.push(new ECG(deviceId, 0.2, 30));
            }
            return entries;
        } else if (deviceId === '3') {
            const entries = [new ECG(deviceId, 0.6, 30)];
            for (let i = 0; i <= 59; i++) {
                entries.push(new ECG(deviceId, 0.5, 30));
            }
            return entries;
        } else if (deviceId === '4') {
            const irrEcg = new ECG(deviceId, 0.6, 30, new Date().toISOString(), undefined, new Date('2024-07-11').toISOString());
            const entries = [irrEcg];
            for (let i = 0; i <= 58; i++) {
                const regEcg = new ECG(deviceId, 0.2, 30);
                regEcg.setIsRegular(true);
                entries.push(regEcg);
            }
            return entries;
        }
        console.log('checado o dispositivo', { deviceId });
        return [];
    };

}