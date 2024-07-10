import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { CreateEntriesInputDTO } from "../../dto/createEntries/createEntriesInput.dto";
import { CreateEntriesOutputDTO } from "../../dto/createEntries/createEntriesOutput.dto";
import { AxiosAdapter } from "../../../domain/adapter/axios.interface";

export class CreateEntriesUseCase {
    constructor(private readonly ecgRepository: ECGRepository, private readonly axios: AxiosAdapter) {}

    async execute(input: CreateEntriesInputDTO): Promise<CreateEntriesOutputDTO> {
        console.log('UseCase input', { input });
        const ecg = new ECG(input.deviceId, input.milivolts, input.interval);
        ecg.detectIrregularities();
        const results = await this.ecgRepository.instabilityCheck(ecg.deviceId);
        console.log('results', { results: results.length });

        if (results.length >= 60) {
            const irregularMeasurements = results.filter(item => !(item.isRegular));
            console.log('Analysing results...', { length: irregularMeasurements.length, irregularMeasurements });

            if (irregularMeasurements.length >= 5) {
                const bipExists = results.some(item => item.bippedAt && !item.unBippedAt);

                if (!bipExists) {
                    await this.ecgRepository.update({
                        id: results[0].id,
                        milivolts: results[0].milivolts,
                    }, {
                        bippedAt: new Date().toISOString(),
                    });

                    console.log('BIP!', { at: new Date().toISOString() });
                    const res = await this.axios.post(ecg.localRoute, { signal: 'bip' });
                    console.log({ res: res.data });
                }
            } else if (irregularMeasurements.length === 0) {
                const bipWithoutUnbip = results.find(item => item.bippedAt && !item.unBippedAt);

                if (bipWithoutUnbip) {
                    await this.ecgRepository.update({
                        id: bipWithoutUnbip.id,
                        milivolts: bipWithoutUnbip.milivolts,
                    }, {
                        unBippedAt: new Date().toISOString(),
                    });

                    console.log('BIP BIP!', { at: new Date().toISOString() });
                    const res = await this.axios.post(ecg.localRoute, { signal: 'bipbip' });
                    console.log({ res: res.data });
                }
            }
        }

        await this.ecgRepository.save(ecg);

        return new CreateEntriesOutputDTO(ecg.id, ecg.deviceId, ecg.milivolts, ecg.interval, ecg.isRegular);
    }
}