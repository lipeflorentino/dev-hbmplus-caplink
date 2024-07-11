import { AnyItem } from "dynamoose/dist/Item";
import { QueryResponse } from "dynamoose/dist/ItemRetriever";
import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { ECGModel } from "../../database/dynamoose/model/ECG.model";

export class DynamooseDBRepository implements ECGRepository {
    async save(ecg: ECG): Promise<void> {
        const newECG = new ECGModel(ecg);
        const savedItem = await newECG.save();
        console.log('Item salvo na tabela!', { savedItem });
    }

    async update(keys: { id: string, createdAt: string }, params: Partial<ECG>): Promise<void> {
        console.log('updating...', { keys, params });
        await ECGModel.update({
            id: keys.id,
            createdAt: new Date(keys.createdAt).toISOString(),
        }, params);
    }

    async listEntries(deviceId: string, interval: string): Promise<ECG[]> {
        console.log('listando resultados do device', { deviceId, interval });
        const limit = 30;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(
            Number(interval) > limit
                ? limit
                : endDate.getDate() - Number(interval)
        );
        const formattedStartDate = startDate.toISOString() + ' 00:00:00';
        const formattedEndDate = endDate.toISOString() + ' 23:59:59';

        console.log({ formattedStartDate, formattedEndDate, deviceId });

        const results = await ECGModel.query('deviceId')
            .eq(deviceId)
            .where('createdAt')
            .between(formattedStartDate, formattedEndDate)
            .using('DeviceIdIndex')
            .exec();

        console.log({ results: results.length });

        return results.toJSON().map((ecgData) => {
            return new ECG(
                ecgData.deviceId,
                ecgData.milivolts,
                ecgData.interval,
                ecgData.bippedAt,
                ecgData.unBippedAt,
                ecgData.createdAt,
            );
        });
    }

    async listIrregulaties(deviceId: string): Promise<ECG[]> {
        const results = await ECGModel.query('deviceId')
            .eq(deviceId)
            .where('isRegular')
            .eq(false)
            .using('DeviceIdIndex')
            .exec();

        return results.toJSON().map((ecgData) => {
            return new ECG(
                ecgData.deviceId,
                ecgData.milivolts,
                ecgData.interval,
                ecgData.bippedAt,
                ecgData.unBippedAt,
                ecgData.createdAt,
            );
        });
    }

    async instabilityCheck(deviceId: string): Promise<QueryResponse<AnyItem>> {
        return ECGModel.query('deviceId')
            .eq(deviceId)
            .sort('descending') // Ordenar por data de criação decrescente
            .limit(60) // Limitar a 60 medições
            .using('DeviceIdIndex')
            .exec();
    }
} 