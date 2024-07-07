import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

export class MockDBRepository implements ECGRepository {
    async save(ecg: ECG): Promise<void> {
        console.log('salvo com sucesso', { ecg });
    }

    async getHistory(deviceId: string): Promise<ECG[]> {
        console.log('listando resultados do device', { deviceId })
        const ecg_1 = new ECG('1', 100, 1);
        return [ecg_1];
    }
} 