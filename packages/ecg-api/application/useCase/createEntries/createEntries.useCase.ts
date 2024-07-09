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

        if (!ecg.isRegular) {
            const results = await this.ecgRepository.instabilityCheck(ecg.deviceId);
            const irregularMeasurements = results.filter(item => !item.isRegular);

            if (irregularMeasurements.length >= 5) {
                const bipExists = results.some(item => item.bippedAt && !item.unBippedAt);
                if (!bipExists) {
                    await this.ecgRepository.update({
                        id: results[0].id,
                        milivolts: results[0].milivolts,
                    }, {
                        bippedAt: new Date().toISOString(),
                    });

                    console.log('BIP!');
                    await this.axios.post('http://localhost:3000/receive-signal', { signal: 'bip' });
                }
            } else {
                const bipWithoutUnbip = results.find(item => item.bippedAt && !item.unBippedAt);

                if (bipWithoutUnbip) {
                    await this.ecgRepository.update({
                        id: bipWithoutUnbip.id,
                        milivolts: bipWithoutUnbip.milivolts,
                    }, {
                        unBippedAt: new Date().toISOString(),
                    });

                    console.log('BIP BIP!');
                    await this.axios.post('http://localhost:3000/receive-signal', { signal: 'bipbip' });
                }
            }
        }

        this.ecgRepository.save(ecg);

        return new CreateEntriesOutputDTO(ecg.id, ecg.deviceId, ecg.milivolts, ecg.interval, ecg.isRegular);
    }
}