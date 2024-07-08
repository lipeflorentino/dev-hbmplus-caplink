import { ECG } from "../entities/ECG.entity";

export interface ECGRepository {
    save(ecg: ECG): Promise<void>;
    listEntries(deviceId: string, interval?: string): Promise<ECG[]>;
}