import { ECG } from "../entities/ECG.entity";

export interface ECGRepository {
    save(ecg: ECG): Promise<void>;
    update(keys: { id: string, createdAt: string }, params: Partial<ECG>): Promise<void>;
    listEntries(deviceId: string, interval?: string): Promise<ECG[]>;
    listIrregulaties(deviceId: string): Promise<ECG[]>;
    instabilityCheck(deviceId: string): Promise<any[]>;
}