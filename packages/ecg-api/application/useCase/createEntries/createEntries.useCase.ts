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
        if (!ecg.isRegular) await ecg.verifyMarker();
        // salvar a entrada
        this.ecgRepository.save(ecg);

        return new CreateEntriesOutputDTO(ecg.id, ecg.deviceId, ecg.milivolts, ecg.interval, ecg.isRegular);
    }
}