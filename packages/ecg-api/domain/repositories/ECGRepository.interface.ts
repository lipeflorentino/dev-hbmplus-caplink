import { ECG } from "../entities/ECG.entity";

export interface ECGRepository {
    save(ecg: ECG): Promise<void>;
    getHistory(deviceId: string): Promise<ECG[]>;
}