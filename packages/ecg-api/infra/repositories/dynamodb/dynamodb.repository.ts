import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { ECGModel } from "../../database/dynamoose/model/ECG.model";

export class DynamooseDBRepository implements ECGRepository {
    async save(ecg: ECG): Promise<void> {
        console.log('ECG_MODEL', { ecg });
        const newECG = new ECGModel(ecg);
        console.log('dynamoose model created!', { newECG });
        const response = await newECG.save();
        console.log(response);
    }

    async listEntries(deviceId: string, interval: string): Promise<ECG[]> {
        console.log('listando resultados do device', { deviceId, interval });

        const ecg_1 = new ECG('1', 100, 1);
        return [ecg_1];
    }
} 