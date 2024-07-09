import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { CreateEntriesInputDTO } from "../../dto/createEntries/createEntriesInput.dto";
import { CreateEntriesOutputDTO } from "../../dto/createEntries/createEntriesOutput.dto";

export class CreateEntriesUseCase {
    constructor(private readonly ecgRepository: ECGRepository) {}

    async execute(input: CreateEntriesInputDTO): Promise<CreateEntriesOutputDTO> {
        console.log('UseCase input', { input });
        const ecg = new ECG(input.deviceId, input.milivolts, input.milivolts);
        // verificar se ecg é ou não irregular
        ecg.detectIrregularities();

        if (!ecg.isRegular) {
            // verifica os ultimos 60
            const results = await this.ecgRepository.instabilityCheck(ecg.deviceId);
            const irregularMeasurements = results.filter(item => !item.isRegular);

            // Verificar se há pelo menos 5 medições irregulares
            if (irregularMeasurements.length >= 5) {
                // Verificar se já há um bip salvo
                const bipExists = results.some(item => item.bippedAt && !item.unBippedAt);

                if (!bipExists) {
                    // Salvar o bip
                    const bipTime = new Date().toISOString();

                    await this.ecgRepository.put({
                        id: results[0].id, // Atualizar o item mais recente
                        bippedAt: bipTime,
                    });

                    // ENVIAR BIP PARA O DISPOSITIVO
                    console.log('BIP!');
                }
            } else {
                // Verificar se há um bip sem unbip
                const bipWithoutUnbip = results.find(item => item.bippedAt && !item.unBippedAt);

                if (bipWithoutUnbip) {
                    // Salvar o unbip
                    const unBipTime = new Date().toISOString();

                    await this.ecgRepository.put({
                        id: bipWithoutUnbip.id,
                        unBippedAt: unBipTime
                    });

                    // ENVIAR UNBIP PARA O DISPOSITIVO
                    console.log('BIP BIP!');
                }
            }
        }
        // salvar a entrada
        this.ecgRepository.save(ecg);

        return new CreateEntriesOutputDTO(ecg.id, ecg.deviceId, ecg.milivolts, ecg.interval, ecg.isRegular);
    }
}