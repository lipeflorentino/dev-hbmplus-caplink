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
        const limit = 30;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(
            endDate.getDate() - Number(interval) > limit
                ? limit
                : Number(interval)
        );
        const formattedStartDate = startDate.toISOString() + ' 00:00:00';
        const formattedEndDate = endDate.toISOString() + ' 23:59:59';

        console.log({ formattedStartDate, formattedEndDate, deviceId });

        const search = await ECGModel.query('deviceId')
            .eq(deviceId)
            .where('createdAt')
            .between(formattedStartDate, formattedEndDate)
            .using('DeviceIdIndex')
            .exec();

        console.log({ search });

        return search.toJSON().map((ecgData) => {
            return new ECG(
                ecgData.deviceId,
                ecgData.milivolts,
                ecgData.interval,
                ecgData.marker,
                ecgData.createdAt,
            );
        });
    }
} 